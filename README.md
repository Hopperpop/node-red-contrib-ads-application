# node-red-contrib-ads-application
[![NPM](https://img.shields.io/npm/l/node-red-contrib-ads-application)](https://github.com/Hopperpop/node-red-contrib-ads-application/blob/master/LICENSE)
[![GitHub](https://img.shields.io/badge/View%20on-GitHub-brightgreen)](https://github.com/Hopperpop/node-red-contrib-ads-application)
[![npm](https://img.shields.io/npm/v/node-red-contrib-ads-application)](https://www.npmjs.com/package/node-red-contrib-ads-application)

Application extention for [node-red-contrib-ads-client](https://flows.nodered.org/node/node-red-contrib-ads-client). The goal is to create nodes that uses ADS to communicate with other ADS modules than the standard plc variables.

Currently implemented:
- Read Beckhoffs IPC device manager
- Subscribe to ads logger

Future nodes:
- CoE communication
- IO-Link communication
- Event logger
- ...

**ads-beckhoff-devicemanager**
![ads-beckhoff-devicemanager](https://user-images.githubusercontent.com/11853634/230030194-b3fe74c5-64dc-4e8c-9efa-c849e241b6d3.png)

**ads-logger**
![ads-logger](https://user-images.githubusercontent.com/11853634/231721204-2c15c3d8-1126-47b3-bc28-3019606f4e16.png)


# License
Copyright (c) 2023 Hopperpop


The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
