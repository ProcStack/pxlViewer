# **pxlViewer**  *v1.0*
-----------------------------------
### **A PyQt and WebView based image viewer.**<br/>

*(Currently only intended for linux)*<br/>

I was getting a little tired of the default options in linux; so I made this thing.<br/>
http://metal-asylum.net/github/pxlViewer06Updates.gif

______________________________

I've linked it to an alias for ease of use; in my *.bash_aliases* file I added-<br/>
**`alias v='python /your/path/to/pxlViewer.py '`**

It can be ran locally from any folder--<br/>
With no specified file to load, the first image found is displayed.<br/>
**`v`**

Or with a specific file given; currently only relative paths work. Sorry, absolute path support soon to come.<br/>
**`v imageFile.jpg`**
______________________________

**`Left click drag`** to move image around

**`Wheel up/down`** or **`right click drag`** to zoom

Hitting **`Spacebar`**, **`H`**, or **`Return`** will reset the zoom; fitting the image to your window.

**`R`** to refresh the current image

**`H`** to home the image, sets 100% zoom.

**`Escape`** will close pxlViewer

**`Left Key`** loads Previous image in directory.

**`Right Key`** loads Next image in directory.

**`F`** toggles full screen.

**`Alt key`** toggles menuBar; displays 'File' 'Image Info' and 'Help.<br/>
`Image Into` displays the file name, resolution, and file size of the image.<br/>
`Help` displays keyboard shortcuts.

Use the **`-debug`** or **`-d`** flag to enter debug mode.  Allows for inspecting the WebView's page; the developer tools window.
<br/>
<br/>

______________________________
______________________________
## Installation for Linux<br/>
*Upgrading pip helped the other install correctly*<br/>
```
python -m pip install --upgrade pip
pip install numpy
pip install matplotlib
pip install opencv-python
pip install Pillow
sudo apt-get install python-qt4
```
<br/>

______________________________
## Installation for Windows<br/>
*Following these insructions only got me so far, but you can find documentation on opencv*<br/>
[readthedocs.io - Setup OpenCV in Windows](http://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_setup/py_setup_in_windows/py_setup_in_windows.html)<br/>
<br/>

**What worked for me on Windows 10 -**<br/>
*Open a Command Prompt, search for `cmd` in your windows menu*<br/>
*Find the pip.exe in your python version, copy that path, in `cmd`, this should look like-*<br/>
`cd C:\Python27\Scripts`<br/>
*It should move you to the folder-*<br/>
`C:\Python27\Scripts>`<br/>
<br/>

*This helped me for installing some packs correctly, update the pip exes; run this-*<br/>
`python -m pip install --upgrade pip`<br/>
<br/>

*Install dependencies by running-*<br/>
```
pip install numpy
pip install matplotlib
pip install opencv-python
pip install Pillow
```
<br/>

*You'll need to download sip and PyQt4;*<br/>
*But as of 4/1/2018, there was no exe build for the newest version of PyQt4.12*<br/>
*Sooo, either (1) try an older bundle version, 4.11.4 **This worked fine for me** -*<br/>
https://sourceforge.net/projects/pyqt/files/PyQt4/PyQt-4.11.4/<br/>

*Or (2) manually set up Sip and PyQt through their source-*<br/>
https://riverbankcomputing.com/software/sip/download<br/>
https://riverbankcomputing.com/software/pyqt/download<br/><br/>

*Test your opencv by running-*<br/>
`python`

*Then in Python-*<br/>
```
import cv2
print cv2.__version__
exit()
```
<br/>

*pxlViewer can only be used through Command Prompt;*<br/>
*Starting in pxlViewer v1.2, there should be a self contained executable to launch images with*<br/>
*For now, you can navigate to your desired directory by copying the address bar path into `cmd` like-*<br/>
`cd C:/path/to/image/directory`

*You can view that directory with-*<br/>
`python  C:/your/path/to/pxlViewer.py`<br/>
*Or view a specific image with-*<br/>
`python  C:/your/path/to/pxlViewer.py imageName.ext`<br/>
###### End of Windows Install<br/>
______________________________

### Thanks for checking out pxlViewer!

