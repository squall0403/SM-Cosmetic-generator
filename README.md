**Prerequisite**
 * NodeJS must be installed on your PC: https://nodejs.org/en/download/

**Getting git folder**
 1. Clone repo with Git: ```git clone https://github.com/squall0403/SM-Cosmetic-generator.git```
 2. Shift + Right click on **SM Cosmetic generator** folder > Select **Open Powershell window**
 3. Run command: ```npm i```
**Install as Figma Plugin**
 1. Open Figma > Open a design > Right click > Plugin > Development > Import Plugin from Manifest
 2. Select **manifest.json** in SM-Cosmetic-generator folder

**Using the plugin**
The plugin only works with Vector shape (Created by **Creation tool**). In order to get Seatmap JSON file:
1. Select Vector shape or;
    Groupd Vectors into a Group > Select the Group
2. Right click > Plugin > Development > SM Cosmetic generator
3. Wait for the Plugin to be executed
4. Click **Download JSON file** to export as Seat map JSON
