const INDEXGROUP = 0xF302;  //Index group for all device manager ads commands

const MDPERRORCODES = {
  3970301953: "Fail - Unspecified error",
  3970302208: "Invalid index",
  3970302209: "Invalid access",
  3970302210: "Buffer too small",
  3970302211: "Type not supported",
  3970302212: "Out of memory",
  3970302213: "No data available",
  3970302214: "Invalid data",
  3970302215: "Invalid arg",
  3970302216: "Value out of range",
  3970302464: "Server is busy",
  3970302465: "MDP API not initialized",
  3970305792: "Not implemented",
  3970306048: "Not supported",
  3970306047: "Unexpected error"
}

const MDP_ENUMS = {
  Reg_Level:{
    0:  "CP",
    1:  "I/O",
    2:  "PLC",
    3:  "NC-PTP",
    4:  "NCI"
  },
  E_RouteTransportType:{
    0:  "None",
    1:  "TCP_IP",
    2:  "IIO_LIGHTBUS",
    3:  "PROFIBUS_DP",
    4:  "PCI_ISA_BUS",
    5:  "ADS_UDP",
    6:  "FATP_UDP",
    7:  "COM_PORT",
    8:  "USB",
    9:  "CAN_OPEN",
    10: "DEVICE_NET",
    11: "SSB",
    12: "SOAP"
  },
  EWF_State:{
    0:  "Enabled",
    1:  "Disabled"
  },
  EWF_Type:{
    0:  "EWF_DISK",
    1:  "EWF_RAM",
    2:  "EWF_RAM_REG"
  },
  Voltage_Location:{
    0:  "Unknown" ,
    1:  "Other",
    2:  "Processor",
    3:  "Disk",
    4:  "System Management Module",
    5:  "Motherboard",
    6:  "Memory Module",
    7:  "Power Supply",
    8:  "Addin Card",
    9:  "Front Panel Board",
    10: "Back Panel Board",
    11: "Peripherie",
    12: "Chassis",
    13: "Battery",
    14: "UPS",
    15: "Graffic Board",
    16: "Super IO",
    17: "Chipset",
    18: "Power Controller"
  },
  TwinCat_State:{
    0:  "Invalid",
    1:  "Idle",
    2:  "Reset",
    3:  "Init",
    4:  "Start",
    5:  "Run",
    6:  "Stop",
    7:  "Save Config",
    8:  "Load Config",
    9:  "Power failure",
    10: "Power good",
    11: "ERROR",
    12: "Shutdown",
    13: "Suspend",
    14: "Resume",
    15: "Config",
    16: "Reconfig"
  },
  Drive_Type:{
    0:  "DRV_UNKNOWN",
    1:  "DRV_FIXED",
    2:  "DRV_REMOVABLE",
    4:  "DRV_CDROM"
  },
  Mass_Drive_Type:{
    0:  "Unknown",
    1:  "Harddisk",
    2:  "SSD",
    3:  "CFast",
    4:  "CF"
  },
  UPS_Power_Status:{
    0:  "Unknown",
    1:  "Online",
    2:  "On batteries"
  },
  UPS_Communication_Status:{
    0:  "Unknown",
    1:  "Ok",
    2:  "Error"
  },
  UPS_Battery_Status:{
    0:  "Unknown",
    1:  "Ok",
    2:  "Change battery"
  },
  UWF_Overlay_Mode:{
    0:  "RAM",
    1:  "Disk"
  },
  Firewall_Action:{
    0:  "Block",
    1:  "Allow",
    2:  "Allow response"
  },
  RAID_State:{
    1:  "Good",
    2:  "Failed",
    3:  "Offline",
    4:  "Poweroff"
  },
  RAID_Offline:{
    0:  "No reason",
    1:  "Initializing",
    2:  "Bus degraded",
    3:  "Bus failure"
  },
  RAID_Type:{
    0:  "No RAID",
    1:  "RAID 0",
    2:  "RAID 1",
    3:  "RAID 10",
    4:  "RAID 5",
    5:  "RAID 15",
    255:"Not standard"
  },
  RAID_HDD_Status:{
    0:  "Ok",
    1:  "Rebuilding",
    2:  "Failed",
    3:  "Degraded"
  },
  SMART_Attribute_ID:{
    1: "Read Error Rate",
    2: "Throughput Performance",
    3: "Spin-Up Time",
    4: "Start/Stop Count",
    5: "Reallocated Sectors Count",
    6: "Read Channel Margin",
    7: "Seek Error Rate",
    8: "Seek Time Performance",
    9: "Power-On Hours (POH)",
    10: "Spin Retry Count",
    11: "Recalibration Retries",
    12: "Device Power Cycle Count",
    13: "Soft Read Error Rate",
    100: "Erase/Program Cycles",
    103: "Translation Table Rebuild",
    108: "Unknown",
    170: "Reserved Block Count",
    171: "Program Fail Count",
    172: "Erase Fail Count",
    173: "Wear Leveller Worst Erase Count",
    174: "Unexpected Power Loss",
    175: "Program Fail Count",
    176: "Erase Fail Count",
    177: "Wear Leveling Count",
    178: "Used Reserved Block Count",
    179: "Used Reserved Block Count",
    180: "Unused Reserved Block Count",
    181: "Program Fail Count",
    182: "Erase Fail Count",
    183: "SATA Downshifts",
    184: "End-to-End error",
    185: "Head Stability",
    186: "Induced Op-Vibration Detection",
    187: "Reported Uncorrectable Errors",
    188: "Command Timeout",
    189: "High Fly Writes",
    190: "Temperature Difference from 100",
    191: "G-sense error rate",
    192: "Power-off Retract Count",
    193: "Load/Unload Cycle",
    194: "Temperature",
    195: "Hardware ECC Recovered",
    196: "Reallocation Event Count",
    197: "Current Pending Sector Count",
    198: "Uncorrectable Sector Count",
    199: "UltraDMA CRC Error Count",
    200: "Write Error Rate/Multi-Zone Error Rate",
    201: "Soft Read Error Rate",
    202: "Data Address Mark errors",
    203: "Run Out Cancel",
    204: "Soft ECC Correction",
    205: "Thermal Asperity Rate (TAR)",
    206: "Flying Height",
    207: "Spin High Current",
    208: "Spin Buzz",
    209: "Offline Seek Performance",
    220: "Disk Shift",
    221: "G-Sense Error Rate",
    222: "Loaded Hours",
    223: "Load/Unload Retry Count",
    224: "Load Friction",
    225: "Load/Unload Cycle Count",
    226: "Load 'In'-time",
    227: "Torque Amplification Count",
    228: "Power-Off Retract Cycle",
    230: "GMR Head Amplitude",
    231: "Temperature",
    232: "Available Reserved Space",
    233: "Media Wearout Indicator",
    240: "Head Flying Hours",
    241: "Total LBAs Written",
    242: "Total LBAs Read",
    250: "Read Error Retry Rate"
  }
}

const DEVICEDESC = {
  0x0:{ //Fake general module
    Device_Name:              {"Area":0x1008, "SubIndex": 0x0, "Type": "STRING(255)"},
    Hardware_Version:         {"Area":0x1009, "SubIndex": 0x0, "Type": "STRING(255)"},
    OS_Image_Version:         {"Area":0x100A, "SubIndex": 0x0, "Type": "STRING(255)"},
    Vendor:                   {"Area":0x1018, "SubIndex": 0x1, "Type": "UINT32"},
    Serial_Number:            [{"Area":0x1018, "SubIndex": 0x4, "Type": "UINT32"}, {"Area":0xF9F0, "SubIndex": 0x0, "Type": "STRING(255)"}]
  },
  //0x1:{ //DataStore (-Undocumented?)

  //},
  0x2:{ //NIC
    MAC_Adress:               {"Area":0x8001, "SubIndex": 0x1, "Type": "STRING(255)"},
    IPv4_Adress:              {"Area":0x8001, "SubIndex": 0x2, "Type": "STRING(255)"},
    IPv4_Subnet_Mask:         {"Area":0x8001, "SubIndex": 0x3, "Type": "STRING(255)"},
    DHCP:                     {"Area":0x8001, "SubIndex": 0x4, "Type": "BOOL"},
    IPv4_Default_Gateway:     {"Area":0x8001, "SubIndex": 0x5, "Type": "STRING(255)"},
    IPv4_DNS_Servers:         {"Area":0x8001, "SubIndex": 0x6, "Type": "STRING(255)", "Optional": true},
    Virtual_Device_Name:      {"Area":0x8001, "SubIndex": 0x7, "Type": "STRING(255)", "Optional": true},
    IPv4_DNS_Servers_Active:  {"Area":0x8001, "SubIndex": 0x8, "Type": "STRING(255)", "Optional": true}
  },
  0x3:{ //Time
    SNTP_Server:               {"Area":0x8001, "SubIndex": 0x1, "Type": "STRING(255)"},
    SNTP_Refresh:              {"Area":0x8001, "SubIndex": 0x2, "Type": "UINT32"},
    Local_Time:                {"Area":0x8001, "SubIndex": 0x3, "Type": "UINT32"},
    Local_Time_Text:           {"Area":0x8001, "SubIndex": 0x4, "Type": "STRING(255)"},
    Timezone:                  {"Area":0x8002, "SubIndex": {"Area":0x8001, "SubIndex": 0x5, "Type": "UINT16"}, "Type": "STRING(80)", "Optional": true, "Offset": 1},
    Timezone_Offset:           {"Area":0x8001, "SubIndex": 0x6, "Type": "INT32", "Optional": true},
  },
  0x4:{ //User management
    User_Name:                  {"Area":0x8001, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"]},
    Domain:                     {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"], "Optional": true},
    Group_Membership:           {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"], "Optional": true},
    Local_Groups:               {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"], "Optional": true},
  },
  0x5:{ //RAS
    Enable:                     {"Area":0x8001, "SubIndex": 0x1, "Type": "BOOL"},
    Slow_Connection:            {"Area":0x8001, "SubIndex": 0x2, "Type": "BOOL"},
    Use_DHCP:                   {"Area":0x8001, "SubIndex": 0x3, "Type": "BOOL"},
    Use_Auto_Addresses:         {"Area":0x8001, "SubIndex": 0x4, "Type": "BOOL"},
    Static_Ip_Count:            {"Area":0x8001, "SubIndex": 0x5, "Type": "UINT32"},
    Static_Ip_Start:            {"Area":0x8001, "SubIndex": 0x6, "Type": "STRING(255)"},
    Line_Names:                 {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"]},
    Enabled:                    {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","BOOL"]},
    UserList:                   {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"]},
  },
  //0x6:{ //DataStore (-Undocumented?)

  //},
  0x7:{ //SMB Server
    SMB_Share_Names:            {"Area":0x8001, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"],},
    SMB_Path_Names:             {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"],},
    Userlist:                   {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"],},
    Access_Right:               {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"],},
  },
  0x8:{ //TwinCat
    Major_Version:              {"Area":0x8001, "SubIndex": 0x1, "Type": "UINT16"},
    Minor_Version:              {"Area":0x8001, "SubIndex": 0x2, "Type": "UINT16"},
    Build:                      {"Area":0x8001, "SubIndex": 0x3, "Type": "UINT16"},
    Ams_Net_ID:                 {"Area":0x8001, "SubIndex": 0x4, "Type": "STRING(255)"},
    Reg_Level:                  {"Area":0x8001, "SubIndex": 0x5, "Type": "UINT32", "Optional": true, "Enum": "Reg_Level"},
    TwinCAT_Status:             {"Area":0x8001, "SubIndex": 0x6, "Type": "UINT16", "Enum": "TwinCat_State"},
    Run_As_Device:              {"Area":0x8001, "SubIndex": 0x7, "Type": "UINT16", "Optional": true},
    Show_Target_Visu:           {"Area":0x8001, "SubIndex": 0x8, "Type": "UINT16", "Optional": true},
    Log_File_Size:              {"Area":0x8001, "SubIndex": 0x9, "Type": "UINT32", "Optional": true},
    Log_File_Path:              {"Area":0x8001, "SubIndex": 0xA, "Type": "STRING(255)", "Optional": true},
    TwinCAT_System_ID:          {"Area":0x8001, "SubIndex": 0xB, "Type": "STRING(255)", "Optional": true},
    TwinCAT_Revision:           {"Area":0x8001, "SubIndex": 0xC, "Type": "UINT16"},
    Route_Name:                 {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]},
    Route_Address:              {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"]},
    Route_AMS_Address:          {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(32)"]},
    Route_Flags:                {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16","UINT32"]},
    Route_Timeout:              {"Area":0x8006, "SubIndex": 0x0, "Type": ["UINT16","UINT32"]},
    Route_Transport:            {"Area":0x8007, "SubIndex": 0x0, "Type": ["UINT16","UINT16"], "Enum": "E_RouteTransportType"}
    //TwinCAT_Logfile:            {"Area":0x8008, "SubIndex": 0x0, "Type": "STRING(255)"}
    //...
  },
  //0x9:{ //DataStore (-Undocumented?)

  //},
  0xA:{ //Software
    Name:                       {"Area":0x8001, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]},
    Company:                    {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"]},
    Date:                       {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","STRING(32)"]},
    Version:                    {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(32)"]},
  },
  0xB:{ //CPU
    CPU_Frequency:              {"Area":0x8001, "SubIndex": 0x1, "Type": "UINT32"},
    CPU_Usage:                  {"Area":0x8001, "SubIndex": 0x2, "Type": "UINT16"},
    CPU_Temperature:            {"Area":0x8001, "SubIndex": 0x3, "Type": "INT16", "Optional": true}
  },
  0xC:{ //Memory
    Program_Memory_Allocated:   [{"Area":0x8001, "SubIndex": 0x6, "Type": "UINT64"},{"Area":0x8001, "SubIndex": 0x1, "Type": "UINT32"}],
    Program_Memory_Available:   [{"Area":0x8001, "SubIndex": 0x7, "Type": "UINT64"},{"Area":0x8001, "SubIndex": 0x2, "Type": "UINT32"}],
    Storage_Memory_Allocated:   {"Area":0x8001, "SubIndex": 0x3, "Type": "UINT32", "Optional": true},
    Storage_Memory_Available:   {"Area":0x8001, "SubIndex": 0x4, "Type": "UINT32", "Optional": true},
  },
  0xE:{ //Firewall
    Activate_IPv4:              {"Area":0x8001, "SubIndex": 0x1, "Type": "BOOL"},
    Activate_IPv6:              {"Area":0x8001, "SubIndex": 0x2, "Type": "BOOL"},
    Persist:                    {"Area":0x8001, "SubIndex": 0x3, "Type": "BOOL"},
    Flags:                      {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","UINT16"]}, //Has enum for flags
    Mask:                       {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","UINT16"]},//Has enum for flags
    Private_Host:               {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]},
    Public_Host:                {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]},
    Public_Host_Mask:           {"Area":0x8006, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]},
    Protocol:                   {"Area":0x8007, "SubIndex": 0x0, "Type": ["UINT16","UINT32"]},
    Action:                     {"Area":0x8008, "SubIndex": 0x0, "Type": ["UINT16","UINT16"], "Enum": "Firewall_Action"},
    Port_Area:                  {"Area":0x8009, "SubIndex": 0x0, "Type": ["UINT16","UINT32"]},
    Type_And_Code:              {"Area":0x800A, "SubIndex": 0x0, "Type": ["UINT16","WORD"]},
    Description:                {"Area":0x800B, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]},
    UID:                        {"Area":0x800C, "SubIndex": 0x0, "Type": ["UINT16","UINT32"]}
  },
  //0x10:{ //File system

  //},
  0x13:{ //Display device
    Display_Mode:               {"Area":0x8002, "SubIndex": {"Area":0x8001, "SubIndex": 0x1, "Type": "UINT8"}, "Type": "STRING(64)", "Optional": true},
    Is_Primary_Display:         {"Area":0x8003, "SubIndex": 0x1, "Type": "BOOL", "Optional": true},
    Com_Port:                   {"Area":0x8003, "SubIndex": 0x2, "Type": "STRING(255)", "Optional": true},
    Version:                    {"Area":0x8003, "SubIndex": 0x3, "Type": "UINT32", "Optional": true},
    Brightness:                 {"Area":0x8003, "SubIndex": 0x4, "Type": "UINT32", "Optional": true},
    Light:                      {"Area":0x8003, "SubIndex": 0x5, "Type": "BOOL", "Optional": true}
  },
  0x14:{ //EWF
    Volume_Name:                {"Area":0x8001, "SubIndex": 0x0, "Type": ["UINT16","STRING(8)"]},
    Volume_Id:                  {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","STRING(64)"]},
    State:                      {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","UINT32"], "Enum": "EWF_State"},
    Type:                       {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","UINT32"], "Enum": "EWF_Type"},
    Boot_Command:               {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16","UINT32"]}
  },
  0x15:{ //FBWF
    CurrentState:               {"Area":0x8001, "SubIndex": 0x1, "Type": "UINT32"},
    CurrentState_Compression:   {"Area":0x8001, "SubIndex": 0x2, "Type": "UINT32"},
    CurrentState_PreAllocation: {"Area":0x8001, "SubIndex": 0x3, "Type": "UINT32"},
    NextState:                  {"Area":0x8002, "SubIndex": 0x1, "Type": "UINT32"},
    NextState_Compression:      {"Area":0x8002, "SubIndex": 0x2, "Type": "UINT32"},
    NextState_PreAllocation:    {"Area":0x8002, "SubIndex": 0x3, "Type": "UINT32"},
    Volumes:                    {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","STRING(64)"]},
    Exclusions:                 {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]}
  },
  0x18:{ //Operating system
    OS_Major_Version:           {"Area":0x8001, "SubIndex": 0x1, "Type": "UINT32"},
    OS_Minor_Version:           {"Area":0x8001, "SubIndex": 0x2, "Type": "UINT32"},
    OS_Build:                   {"Area":0x8001, "SubIndex": 0x3, "Type": "UINT32"},
    CSD_Version:                {"Area":0x8001, "SubIndex": 0x4, "Type": "STRING(255)"},
  },
  0x19:{ //RAID
    State:                      {"Area":0x8001, "SubIndex": 0x1, "Type": "UINT32", "Enum": "RAID_State"}, 
    Offline_Reason:             {"Area":0x8001, "SubIndex": 0x2, "Type": "UINT32", "Enum": "RAID_Offline"},
    Types:                      {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16", "UINT8"], "Enum": "RAID_Type"},
    State_Info:                 {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16", "UINT16"]}, //Combined enum
    Devices:                    {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16", "STRING(255)"]},
    Serial_Numbers:             {"Area":0x8009, "SubIndex": 0x0, "Type": ["UINT16", "STRING(64)"]},
    Hard_Disk_Status:           {"Area":0x800A, "SubIndex": 0x0, "Type": ["UINT16", "UINT8"], "Enum": "RAID_HDD_Status"},
  },
  0x1B:{ //Fan  
    Speed:                      {"Area":0x8001, "SubIndex": 0x1, "Type": "INT16"},        
  },
  0x1C:{ //Mainboard
    Type:                       {"Area":0x8001, "SubIndex": 0x1, "Type": "STRING(255)"},
    Serial_Number:              {"Area":0x8001, "SubIndex": 0x2, "Type": "STRING(255)"},
    Production_Date:            {"Area":0x8001, "SubIndex": 0x3, "Type": "STRING(255)"},
    Boot_Count:                 {"Area":0x8001, "SubIndex": 0x4, "Type": "UINT32"},
    Operation_Time:             {"Area":0x8001, "SubIndex": 0x5, "Type": "UINT32"},
    Board_Temperature_Min:      {"Area":0x8001, "SubIndex": 0x6, "Type": "INT32", "Optional":true},
    Board_Temperature_Max:      {"Area":0x8001, "SubIndex": 0x7, "Type": "INT32", "Optional":true},
    Input_Voltage_Min:          {"Area":0x8001, "SubIndex": 0x8, "Type": "INT32", "Optional":true},
    Input_Voltage_Max:          {"Area":0x8001, "SubIndex": 0x9, "Type": "INT32", "Optional":true},
    Mainboard_Temperature:      {"Area":0x8001, "SubIndex": 0xA, "Type": "INT16", "Optional":true},
    Mainboard_Revision:         {"Area":0x8002, "SubIndex": 0x1, "Type": "UINT8"},
    Bios_Major_Version:         {"Area":0x8002, "SubIndex": 0x2, "Type": "UINT8"},
    Bios_Minor_Version:         {"Area":0x8002, "SubIndex": 0x3, "Type": "UINT8"},
    Voltage_Name:               {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16", "STRING(64)"]},
    Voltage_Location:           {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16", "INT16"], "Enum": "Voltage_Location"},
    Voltage_Value:              {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16", "INT16"]},
    Voltage_Nominal_Value:      {"Area":0x8006, "SubIndex": 0x0, "Type": ["UINT16", "INT16"]}
  },
  0x1D:{ //Disk management
    Drive_Letter:               {"Area":0x8001, "SubIndex": 0x0, "Type": ["UINT16", "STRING(16)"]},
    Volume_Lable:               {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16", "STRING(64)"]},
    File_System:                {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16", "STRING(21655)"]},
    Drive_Type:                 {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16", "UINT32"], "Enum": "Drive_Type"},
    Total_Size:                 {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16", "UINT64"]},
    Free_Space:                 {"Area":0x8006, "SubIndex": 0x0, "Type": ["UINT16", "UINT64"]}
  },
  0x1E:{ //UPS
    Model:                      {"Area":0x8001, "SubIndex": 0x1, "Type": "STRING(255)"},
    Vendor:                     {"Area":0x8001, "SubIndex": 0x2, "Type": "STRING(255)"},
    Version:                    {"Area":0x8001, "SubIndex": 0x3, "Type": "UINT8"},
    Revision:                   {"Area":0x8001, "SubIndex": 0x4, "Type": "UINT8"},
    Build:                      {"Area":0x8001, "SubIndex": 0x5, "Type": "UINT16"},
    Serial_Number:              {"Area":0x8001, "SubIndex": 0x6, "Type": "STRING(255)", "Optional": true},
    Power_Status:               {"Area":0x8001, "SubIndex": 0x7, "Type": "UINT8", "Enum": "UPS_Power_Status"},
    Communication_Status:       {"Area":0x8001, "SubIndex": 0x8, "Type": "UINT8", "Enum": "UPS_Communication_Status", "Optional": true},
    Battery_Status:             {"Area":0x8001, "SubIndex": 0x9, "Type": "UINT8", "Enum": "UPS_Battery_Status", "Optional": true},
    Battery_Capacity:           {"Area":0x8001, "SubIndex": 0xA, "Type": "UINT8"},
    Battery_Runtime:            {"Area":0x8001, "SubIndex": 0xB, "Type": "UINT32"},
    Persistent_Power_Fail_Count:{"Area":0x8001, "SubIndex": 0xC, "Type": "BOOL"},
    Power_Fail_Counter:         {"Area":0x8001, "SubIndex": 0xD, "Type": "UINT32"},
    Fan_Error:                  {"Area":0x8001, "SubIndex": 0xE, "Type": "BOOL", "Optional": true},
    No_Battery:                 {"Area":0x8001, "SubIndex": 0xF, "Type": "BOOL", "Optional": true},
    Battery_Replace_Date:       {"Area":0x8001, "SubIndex": 0x20, "Type": "STRING(255)", "Optional": true},
    Interval_Service_Status:    {"Area":0x8001, "SubIndex": 0x30, "Type": "BOOL", "Optional": true}
  },
  0x1F:{ //Pysical Drive (S.M.A.R.T.)
    Index:                      {"Area":0x8001, "SubIndex": 0x1, "Type": "UINT32"},
    Caption:                    {"Area":0x8001, "SubIndex": 0x2, "Type": "STRING(255)"},
    Logical_Partitions:         {"Area":0x8001, "SubIndex": 0x3, "Type": "STRING(255)"},
    Partition_Count:            {"Area":0x8001, "SubIndex": 0x4, "Type": "UINT32"},
    Total_Cylinders:            {"Area":0x8001, "SubIndex": 0x5, "Type": "UINT64"},
    Total_Heads:                {"Area":0x8001, "SubIndex": 0x6, "Type": "UINT32"},
    Total_Sectors:              {"Area":0x8001, "SubIndex": 0x7, "Type": "UINT64"},
    Total_Traks:                {"Area":0x8001, "SubIndex": 0x8, "Type": "UINT64"},
    SMART_Attribute_Id:         {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","UINT8"], "Enum": "SMART_Attribute_ID"},
    SMART_Status_Flags:         {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","UINT16"]},
    SMART_Current_Values:       {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","UINT8"]},
    SMART_Worst_Vaules:         {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16","UINT8"]},
    SMART_Raw_Data:             {"Area":0x8006, "SubIndex": 0x0, "Type": ["UINT16","STRING(6)"]},
    SMART_Thresholds:           {"Area":0x8007, "SubIndex": 0x0, "Type": ["UINT16","UINT8"]},
  },
  0x20:{ //Mass Storage Monitoring
    Serial_Number:              {"Area":0x8001, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"], "Optional": true},
    Sata_Port:                  {"Area":0x8002, "SubIndex": 0x0, "Type": ["UINT16","UINT8"], "Optional": true},
    Partition_Letter:           {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"], "Optional": true},
    Drive_Name:                 {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","STRING(128)"], "Optional": true},
    Drive_Type:                 {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16","UINT8"], "Optional": true, "Enum": "Mass_Drive_Type"},
    Erase_Count_Average:        {"Area":0x8006, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
    Erase_Count_Specified:      {"Area":0x8007, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
    Erase_Cycles_Left_Percent:  {"Area":0x8008, "SubIndex": 0x0, "Type": ["UINT16","INT16"], "Optional": true},
    Spare_Blocks_Remaining:     {"Area":0x8009, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
    Spare_Blocks_Intial:        {"Area":0x800A, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
    Spare_Blocks_Left_Percent:  {"Area":0x800B, "SubIndex": 0x0, "Type": ["UINT16","INT16"], "Optional": true},
    Reallocated_Sectors:        {"Area":0x800C, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
    Spint_Retries:              {"Area":0x800D, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
    Pending_Sectors:            {"Area":0x800E, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
    Ultra_Dma_Crc_Errors:       {"Area":0x800F, "SubIndex": 0x0, "Type": ["UINT16","UINT64"], "Optional": true},
  },
  0x21:{ //UWF
    Current_State:              {"Area":0x8001, "SubIndex": 0x1, "Type": "BOOL"},
    Current_State_Overlay_Mode: {"Area":0x8001, "SubIndex": 0x2, "Type": "UINT32", "Enum": "UWF_Overlay_Mode"},
    Current_State_Overlay_Size: {"Area":0x8001, "SubIndex": 0x3, "Type": "UINT32"},
    Next_State:                 {"Area":0x8002, "SubIndex": 0x1, "Type": "BOOL"},
    Next_State_Overlay_Mode:    {"Area":0x8002, "SubIndex": 0x2, "Type": "UINT32", "Enum": "UWF_Overlay_Mode"},
    Next_State_Overlay_Size:    {"Area":0x8002, "SubIndex": 0x3, "Type": "UINT32"},
    Volumes:                    {"Area":0x8003, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]},
    Volume_Protection_Current:  {"Area":0x8004, "SubIndex": 0x0, "Type": ["UINT16","BOOL"]},
    Volume_Protection_Next:     {"Area":0x8005, "SubIndex": 0x0, "Type": ["UINT16","BOOL"]},
    Exclusions:                 {"Area":0x8006, "SubIndex": 0x0, "Type": ["UINT16","STRING(255)"]}, //Multi string
  },
  0x100:{ //Misc
    Numlock_Startup:            {"Area":0x8001, "SubIndex": 0x1, "Type": "BOOL"},
    CE_Remote_Display_Connected:{"Area":0x8001, "SubIndex": 0x2, "Type": "BOOL", "Optional": true},
    CE_Remote_Display_Enabled:  {"Area":0x8001, "SubIndex": 0x3, "Type": "BOOL", "Optional": true},
    Security_Wizard_Enabled:    {"Area":0x8001, "SubIndex": 0x4, "Type": "BOOL"},
    Auto_Logon_User:            {"Area":0x8001, "SubIndex": 0x5, "Type": "STRING(255)"},
    Auto_Generate_Certificates: {"Area":0x8001, "SubIndex": 0x6, "Type": "BOOL"}
  },
}


module.exports = {
    INDEXGROUP: INDEXGROUP,
    MDPERRORCODES: MDPERRORCODES,
    MDP_ENUMS: MDP_ENUMS,
    DEVICEDESC: DEVICEDESC
};