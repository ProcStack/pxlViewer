# **pxlViewer**  *v1.2*
-----------------------------------
### **A PyQt and WebView based image viewer.**

pxlViewer is a slim, in appearance, image viewer.<br/>
Supporting JPG, JPEG, PNG, BMP, GIF; more to come.<br/>

I was getting a little tired of the default options in linux; so I made this thing.<br/>
![Foopy Scooples](http://metal-asylum.net/github/pxlViewer06Updates.gif)
[pxlVisualizer gif](http://metal-asylum.net/github/pxlViewer06Updates.gif)

**For Windows users-**<br/>
If you download the repo, copy `dist/pxlViewer` to an appropriate location.<br/>
Then delete the extract directory and assign file associations / test by '*Open With . . .*'<br/>
pxlViewer is self contained within `dist/pxlViewer`<br/>

______________________________
## How To Use pxlViewer<br/>
**`Left click drag`** to move image around

**`Wheel up/down`** or **`right click drag`** to zoom

Hitting **`Spacebar`** or **`Return`** will reset the zoom; fitting the image to your window.

**`R`** to refresh the current image

**`H`** to home the image, sets 100% zoom.

**`Escape`** will close pxlViewer

**`Left Key`** loads Previous image in directory.

**`Right Key`** loads Next image in directory.

**`F`** toggles full screen.

**`Alt key`** toggles menuBar; displays 'File' 'Image Info' and 'Help.<br/>
`File` shows `exit`.<br/>
`Image Info` displays the file name, resolution, and file size of the image.<br/>
`Help` displays keyboard shortcuts.

Use the **`-debug`** or **`-d`** flag to enter debug mode.  Allows for inspecting the WebView's page; the developer tools window.
<br/>
<br/>

______________________________
## Installation for Linux
*Upgrading pip helped the other modules install correctly for me*<br/>
```
python -m pip install --upgrade pip
pip install Pillow
sudo apt-get install python-qt4
```

______________________________

I've linked it to an alias for ease of use; in *.bash_aliases* or *.bashrc* you can add-<br/>
**`alias v='python /your/path/to/pxlViewer.py '`**

It can be ran locally from any folder--<br/>
With no specified file to load, the first image found is displayed-<br/>
**`v`**

Or with a specific file given-<br/>
**`v imageFile.jpg`**<br/>

###### End of Linux Install<br/>

______________________________
## Installation for Windows
### To use the premade executable; copy `dist/pxlViewer` to a desired location
### Then delete the extract directory and assign file associations / test by '*Open With . . .*'<br/>
______________________________
#### **If you want to rebuild the executable for windows,** follow the directions below-
**What worked for me on Windows 10 -**<br/>
*Open a Command Prompt, search for `cmd` in your windows menu*<br/>
*Find the `pip.exe` in your python folder, copy that path, add `cd`, then paste into `cmd`; it should look similar to this-*<br/>
`cd C:\Python27\Scripts`<br/>
*Running the command should move you to the folder-*<br/>
`C:\Python27\Scripts>`<br/>
<br/>

*This helped me for installing some packs correctly in general, update the pip exes; run this-*<br/>
`python -m pip install --upgrade pip`<br/>
<br/>

*Pillow Image Library (PIL) is required to run pxlViewer, install by running-*<br/>
```
pip install Pillow
```

*You'll need to download SIP and PyQt4;*<br/>
*But as of 4/1/2018, there was no exe built for the newest version of PyQt4.12*<br/>
*Sooo, either (1) try an older bundle version, 4.11.4 **This worked fine for me** -*<br/>
https://sourceforge.net/projects/pyqt/files/PyQt4/PyQt-4.11.4/<br/>

*Or (2) manually set up Sip and PyQt through their source-*<br/>
https://riverbankcomputing.com/software/sip/download<br/>
https://riverbankcomputing.com/software/pyqt/download<br/><br/>

*To test that pxlViewer works, find directory with images by browse to and copy the path into the command prompt, or navigate there in prompt-*<br/>
`cd C:\path\to\image\directory`

*You can view the first image in the directory with-*<br/>
`python  C:\your\path\to\pxlViewer.py`<br/>
*Or view a specific image with-*<br/>
`python  C:\your\path\to\pxlViewer.py imageName.ext`<br/>

______________________________
### Making pxlViewer easier to use on Windows: Build pxlViewer.exe on Windows
#### *Make sure pxlViewer works with no errors from your Command Prompt first!*
##### *If pxlViewer works, to continue you'll need to have pyinstaller installed*
*To install pyinstaller, from your python/Scripts folder again-*<br/>
`cd C:\Python27\Scripts`<br/>
*Run -*<br/>
`pip install pyinstaller`<br/>

*Then browse to your pxlViewer download/extract folder and double click the `buildExe.bat` file.*<br/>
*This may take a couple minutes to build.*<br/>

*After this, you can right click an image, go to `Open With...`, and navegate to-*
C:\path\to\pxlViewer\\**dist\pxlViewer\pxlViewer.exe**<br/>
<br/>
If all is well, your image should open with **pxlViewer**!<br/>

###### End of Windows Install<br/>
______________________________

### Thanks for checking out pxlViewer!

