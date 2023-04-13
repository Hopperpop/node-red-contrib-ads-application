const mdp = require( './MDP_Constants.js' );
const ads = require('ads-client');

module.exports = class Ads_BeckhoffDeviceManager {

    /**
     * Construct a new Beckhoff device manager with the give ads-client object
     * @param  {} client ads-client
     */
    constructor(client){
      //Reference to ads-client
      this.client = client;
  
      //Cached module list from the device manager
      this.moduleList = [];
    };
    
    /**
     * Get the ads client
     */
    getClient(){
      return client;
    }
    /**
     * Set the ads client
     * @param  {} client ads-client
     */
    setClient(client){
      this.client = client;
    }
  
    /**
     * @param  {string|Array.<string>} [item]   List of items to read. If empty all known properties are read from all modules. The format should be <ModuleType.ModuleName.Property>. "Property" is optional, but at least "ModuleType" or "ModuleName" should be provided.
     * @return {object} Object containing all information
     */
    async ReadDeviceManager(item){
      
  
      //Read modulelist (can be cached)
      try{await this.ReadModulelist()}
      catch(err){throw err}
  
      let reqList = []; //Requested values are grouped per module to be read in parallel
      let data = {};    //Object to store data
  
      /** Add module to the reqList if not existing
       * @param  {Module} module
       * @return {object} reference to module in reqList
       */
      function addModuleToReqList(module){
        let moduleReq = reqList.find(o => o.module.moduleId === module.moduleId);
        if(!moduleReq){
          //Create new module object
          moduleReq = {
            'module': module,
            'reqItemList': [],
            'targetRef': null
          }
          //Create object to store module data and save reference
          if(module.moduleName == module.moduleTypeStr){
            data[module.moduleName] = {};
            moduleReq.targetRef = data[module.moduleName];
          }else{
            data[module.moduleTypeStr] = data[module.moduleTypeStr] || {};
            data[module.moduleTypeStr][module.moduleName] = {};
            moduleReq.targetRef = data[module.moduleTypeStr][module.moduleName]
          } 
          //Add module to reqList
          reqList.push(moduleReq);
        }
        return moduleReq
      }
  
      /**
       * @param  {object}   moduleReq   Reference to the module request object
       * @param  {object}   devDesc     Reference to the devDesc of the specified module
       * @param  {string}   propName    Propertyname to add
       * @param  {boolean}  [skipCheck] Set true to skip check if the property is defined in DEVICEDESC and isn't already in the list
       */
      function addPropToReqList(moduleReq, devDesc, propName, skipCheck){
        if(!skipCheck){
          let prop = moduleReq.reqItemList.find(o => o.name === propName);
          if(prop){
            return; //Property already in request list
          }
          if(! propName in devDesc){
            return; //Property name not known
          }
        } 
        moduleReq.reqItemList.push(
          {
            'desc': devDesc[propName],
            'name': propName
          }
        ) 
      }
  
      //Fill reqList
      if (!item || item==""){ //Empty item => read all modules and all properties
        //Build request list for all modules
        for (var i in this.moduleList){
          let module = this.moduleList[i];
          let devDesc = mdp.DEVICEDESC[module.moduleType];
          //Type recognized
          if (devDesc){
            let reqModule = addModuleToReqList(module);
            //Store all property request
            for (var i in devDesc){
              addPropToReqList(reqModule, devDesc, i, true);
            }
          }else{
            //throw new Error(`Can't recognize module type 0x${module.moduleType.toString(16)}.`);
          }
        }
  
      }else{ //Read only the requested properties
        //Convert single item to array with single item
        if(!Array.isArray(item)){
          item = [item];
        }
  
        //Itterate over requested items and build request list
        for(var i in item){
          let tree = item[i].split(/(?<!\$)\./); //Split on unescaped "." (!="$.")
          let devDesc = null;
          let modules = this.moduleList;
          let prop = null;
  
          for(var i in tree){
            tree[i] = tree[i].replace("$.","."); //Remove escape characters for .
          }
  
          if(tree.length > 0){
            modules = modules.filter(o => o.moduleTypeStr === tree[0]);
            //Handle module name = module type
            if(modules.length == 1 && modules[0].moduleTypeStr == modules[0].moduleName && (tree[0] !== tree[1]||"")){
              tree.splice(1, 0, modules[0].moduleTypeStr);
            }
          }
  
          //Find matching modules and grap property (if defined)
          switch(tree.length){
            case 2: //Type + unique module name
              modules = modules.filter(o => o.moduleName === tree[1]);
            case 1: //Only type => all 
              modules = modules.filter(o => o.moduleTypeStr === tree[0]);
              prop = null;
              break;
  
            case 3: //Type + (unique name) + prop
              if(tree[1] === "" || tree[1] === "*"){ //Empty unique name
                modules = modules.filter(o => o.moduleTypeStr === tree[0]);
              }else{
                modules = modules.filter(o => o.moduleName === tree[1] && o.moduleTypeStr === tree[0]);
              }
              prop = tree[2]
              break;
          }
  
          //Grap module description (all modules should be the same time => use first)
          if(modules.length > 0){
            devDesc = mdp.DEVICEDESC[modules[0].moduleType]
            if(!devDesc){
              modules = []; //Module description not found => drop everything
            }
          }
  
          //Add all matching modules and their properties to request list
          for(var mod in modules){
            let reqModule = addModuleToReqList(modules[mod]);
            if(prop){
              //Add single property of module
              addPropToReqList(reqModule,devDesc,prop);
            }else{
              //Add all properties of module
              for (var i in devDesc){
                addPropToReqList(reqModule, devDesc, i, true);
              }
            }
          }
        }
      }
  
      //Execute request list = Read the requested properties (parallel) from each module (sequential)
      for(i in reqList){
        await Promise.all(reqList[i].reqItemList.map(async(item)=>{
          try{
            var out = await this._ReadMdpProperty(item.desc, reqList[i].module);
            if(out !== null){
              //Not null => add value
              reqList[i].targetRef[item.name] = out;
            }else{
              if(!item.desc.Optional){
                throw new Error(`Value not found and also not optional. Something went wrong.`)
              }
            }
          }catch(err){
            let oldMsg = err.message || "";
            err.message = `Problem reading item '${item.name}' in module '${reqList[i].module.moduleName}': ${oldMsg}`
            throw err
          }
          
        }));
      }
      return data;
    }
  
  
    /**
     * Reads all module indexes from the devicemanager. This function needs to be called before any other function can be used. 
     * @param  {boolean} force If force is set to true, it will alway read the modules from ads. If false or empty, it will try to use cached values if available.
     */
    async ReadModulelist(force){
        //Use cached values if it exists
        if (!force && this.moduleList.length > 0){
          return this.moduleList;
        }
  
        //Read module list length
        try {
          var IdListLen = await this._readDevManagData(0xF020,0,0,"UINT16");
        } catch (err) {
          throw err
        }
        
        //Clear previous list
        this.moduleList = [];
        
        //Create temp list to store result promise and only store when fully succesfull
        let tempList = [];

        //Read all modules
        try {
  
          let req = [];
          for (var i = 1; i <= IdListLen; i++){
            req.push(i)
          }
          await Promise.all(req.map(async(item)=>{
            let mdpModule     = await this._readDevManagData(0xF020,0,item,"UINT32");
            let moduleId      = mdpModule & 0xFFFF;
            let moduleType    = (mdpModule & 0xFFFF0000) / Math.pow(2,16);
            let moduleTypeStr = await this._readDevManagData(0x8000,moduleId,0x02,"STRING(255)"); 
            let moduleName    = await this._readDevManagData(0x8000,moduleId,0x03,"STRING(255)"); 
            let elem  = {
              'moduleType'    : moduleType, 
              'moduleId'      : moduleId,
              'moduleTypeStr' : moduleTypeStr,
              'moduleName'    : moduleName,
            };
            tempList[item-1] = elem;
          }))
  
          //Fake general module
          tempList[0] = {
            'moduleType'    : 0, 
            'moduleId'      : 0,
            'moduleTypeStr' : "General",
            'moduleName'    : "General",
          }

          this.moduleList = tempList;
          return this.moduleList;
  
        } catch (err) {
  
          this.moduleList = []; //Clear list as it's not complete
          throw err
  
        }
    }
  
    //-----Internal functions------
  
    /**
     * Read a MDP property 
     * @param   {MDPpropDescription|Array.<MDPpropDescription>}  desc    Property description. If it's an array of descriptions the first valid description is used
     * @param   {Module}                                         module  The module information
     * @returns {any}  The found value, null if not found
     */
    async _ReadMdpProperty( desc, module){
  
      //--"desc" is an array => iterrate primitive types until succesfull--
      if(Array.isArray(desc) ){
        
        for (var i in desc){
          try{
            let var_out = await this._readDevManagData(desc[i].Area, module.moduleId, desc[i].SubIndex, desc[i].Type, desc[i].Enum || null);
            if( var_out !== null){
              return var_out;
            }
          }catch(err){}
        }
        throw new Error(`Can't find a succeeding value`);
      } 
  
      //--"Type" is an array => Read array of properties with a defined length 
      else if (Array.isArray(desc.Type)){
        try{
  
          //Type[0] = length; Type[1] = array type
          //Read array length
          let arr_length = await this._readDevManagData(desc.Area, module.moduleId, desc.SubIndex, desc.Type[0], null);
          let arr = [];
  
          //Build a request array (for parallel execution)
          let reqarr = [];
          for (var i = 1; i <= arr_length; i++){
              reqarr.push({"subIndex": desc.SubIndex + i, "i": i-1});
          }
          //request array values
          await Promise.all(reqarr.map(async(arr_item)=>{
              let var_out = await this._readDevManagData(desc.Area, module.moduleId, arr_item.subIndex, desc.Type[1], desc.Enum || null);
              arr[arr_item.i] = var_out;
          }));
  
          //If full array is empty, return null (not supported)
          let empty = true;
          arr.forEach((value)=>{if(value !== null){empty = false}});
          if (empty && arr_length > 0){
            return null;
          }
          return arr; 
  
        }catch(err){throw err}
  
  
      //----Primitive type---
      }else{
        try{
          //Get subindex (can be a pointer)
          let subIndex = 0;
          if (typeof desc.SubIndex === "object"){
            //Subindex needs to be read from a pointer
            let sub = desc.SubIndex;
            subIndex = await this._readDevManagData(sub.Area, module.moduleId, sub.SubIndex, sub.Type);
            subIndex += desc.Offset || 0;
            if (subIndex === 0){
              return null; //Pointer always start at 1, if zero the array that it points to is empty
            }
          }else{
            subIndex = desc.SubIndex;
          }
          let var_out = await this._readDevManagData(desc.Area, module.moduleId, subIndex, desc.Type, desc.Enum || null);
          return var_out;
        }catch(err){throw err}
  
      } 
    }
  
    /**
     * Reads a variable from the device manager and parse it to a correct javascript object
     * @param  {number} area Area code with table id included ex. Device area = 0xF, Table ID 0x1 => 0xF001.
     * @param  {number} module Module id ex. 0x20, is a dynamically value and should be read from the device area.
     * @param  {number} subindex Subindex from the table .
     * @param  {string} dataType Datatype Ex. BOOL/UINT/STRING(128)/...
     * @param  {string} enumDef Name of the enum definition in MDP_ENUMS
     */
    async _readDevManagData( area, module, subindex, dataType, enumDef){
      //Find datatype
      let type = ads.ADS.BASE_DATA_TYPES.find(dataType);
      if (type == null) {
        throw new Error(`Base type ${type} not found from BaseDataTypes - If this should be found, report an issue`)
      };
      //Read data
      try{
  
        let IndexOffset = (((area | ( module*Math.pow(2,4) )  ) *Math.pow(2,16)) | subindex) >>> 0;
        let devManData = await this.client.readRaw(mdp.INDEXGROUP,IndexOffset,type.size,10000);
  
        if( type.adsDataType ==  ads.ADS.ADS_DATA_TYPES.ADST_STRING || type.adsDataType ==  ads.ADS.ADS_DATA_TYPES.ADST_WSTRING){
            //Read string
            let var_out = devManData.toString().replace(/\0+$/g, ''); //Replace nulls at the end
            var_out = var_out.split("\0"); //Split on null termination (serperator in some cases)
            if(var_out.length === 1){var_out = var_out[0]};
            return var_out;
        }else{
            //Read single item
            let var_out = type.fromBuffer(devManData, this.client.settings);
            if (enumDef in mdp.MDP_ENUMS){
              if (var_out in mdp.MDP_ENUMS[enumDef]){
                var_out = mdp.MDP_ENUMS[enumDef][var_out];
              }
            }
            return var_out;
        }
      
      } catch (err) {
        let errCode = ((err||{}).adsErrorInfo||{}).adsErrorCode || -1; //Get ads error if it exists
  
        if( this._isModuleError(errCode)){ //Ignore module errors like 0xECAF0608: "Com Port not set"
          return null;
        }
  
        if(  this._isMdpError(errCode) ){
            
          //String and no data available => empty
          if (errCode == 3970302213){//No data available
            switch(type.adsDataType){
              case ads.ADS.ADS_DATA_TYPES.ADST_STRING:
              case ads.ADS.ADS_DATA_TYPES.ADST_WSTRING:
                return "";
  
              default:
                return null;
  
            }
          } 
  
          return null; //Always return null
  
          /*
          //Not supported, not implemented, invalid index
          if(errCode == 3970302208 || errCode == 3970306048 || errCode == 3970305792){
            return null;
          }
  
          throw new Error(`Failed to read device manager data in area: ${area.toString(16)}, module: ${module.toString(16)}, subindex: ${subindex.toString(16)}, datatype: ${dataType}: MDP_error: ${this._MdpErrorCode(errCode)}`)
          */
        }else{
          throw new Error(`Failed to read device manager data in area: ${area.toString(16)}, module: ${module.toString(16)}, subindex: ${subindex.toString(16)}, datatype: ${dataType}: ${err} - ${errCode}`)
        }
      }
    };
  
  
    /** 
     * Check if error is a MDP error
     * @param  {} err error number
     */
    _isMdpError(err){
        return (err >>> 16)==0xECA6
    }
  
    /** 
     * Check if error is a Module specific error
     * @param  {} err error number
     */
     _isModuleError(err){
      return (err >>> 16)==0xECAF
  }
  
    /**
     * Convert MPD error to string
     * @param  {} err error number
     */
    _MdpErrorCode(err){
      if( err in mdp.MDPERRORCODES){
        return mdp.MDPERRORCODES[err];
      }else{
        return "Unknown MDP Error: " + err;
      }
    }
  
  }