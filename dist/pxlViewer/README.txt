 pxlViewer  v1.0
-----------------------------------
 A PyQt and WebView based image viewer.

pxlViewer is a slim, in appearance, image viewer.
Supporting JPG, JPEG, PNG, BMP, GIF, and any other web browser supported format.

I was getting a little tired of the default options in linux; so I made this thing.
http://metal-asylum.net/github/pxlViewer06Updates.gif

Updates to come to slim down the code base when creating executable on Windows.

______________________________
 How To Use pxlViewer
 `Left click drag ` to move image around

 `Wheel up/down ` or  `right click drag ` to zoom

Hitting  `Spacebar `,  `H `, or  `Return ` will reset the zoom; fitting the image to your window.

 `R ` to refresh the current image

 `H ` to home the image, sets 100% zoom.

 `Escape ` will close pxlViewer

 `Left Key ` loads Previous image in directory.

 `Right Key ` loads Next image in directory.

 `F ` toggles full screen.

 `Alt key ` toggles menuBar; displays 'File' 'Image Info' and 'Help.
 `Image Into ` displays the file name, resolution, and file size of the image.
 `Help ` displays keyboard shortcuts.

Use the  `-debug ` or  `-d ` flag to enter debug mode.  Allows for inspecting the WebView's page; the developer tools window.



______________________________
 Installation for Linux
Upgrading pip helped the others install correctly
 ` ` `
python -m pip install --upgrade pip
pip install numpy
pip install matplotlib
pip install opencv-python
pip install Pillow
sudo apt-get install python-qt4
 ` ` `

______________________________

I've linked it to an alias for ease of use; in .bash_aliases or .bashrc you can add-
 `alias v='python /your/path/to/pxlViewer.py ' `

It can be ran locally from any folder--
With no specified file to load, the first image found is displayed.
 `v `

Or with a specific file given; currently only relative paths work. Sorry, absolute path support soon to come.
 `v imageFile.jpg `

 End of Linux Install

______________________________
 Installation for Windows
Following these insructions only got me so far, but you can find documentation on opencv
[readthedocs.io - Setup OpenCV in Windows](http://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_setup/py_setup_in_windows/py_setup_in_windows.html)


What worked for me on Windows 10 -
Open a Command Prompt, search for  `cmd ` in your windows menu
Find the pip.exe in your python version, copy that path, in  `cmd `, this should look like-
 `cd C:\Python27\Scripts `
It should move you to the folder-
 `C:\Python27\Scripts> `


This helped me for installing some packs correctly, update the pip exes; run this-
 `python -m pip install --upgrade pip `


Install dependencies by running-
 ` ` `
pip install numpy
pip install matplotlib
pip install opencv-python
pip install Pillow
 ` ` `

You'll need to download sip and PyQt4;
But as of 4/1/2018, there was no exe build for the newest version of PyQt4.12
Sooo, either (1) try an older bundle version, 4.11.4 This worked fine for me -
https://sourceforge.net/projects/pyqt/files/PyQt4/PyQt-4.11.4/

Or (2) manually set up Sip and PyQt through their source-
https://riverbankcomputing.com/software/sip/download
https://riverbankcomputing.com/software/pyqt/download

To test that pxlViewer works, you'll need to navigate to your desired image directory in your Command Prompt by copying the file browser address bar path into  `cmd ` like-
 `cd C:\path\to\image\directory `

You can view that directory with-
 `python  C:\your\path\to\pxlViewer.py `
Or view a specific image with-
 `python  C:\your\path\to\pxlViewer.py imageName.ext `

______________________________
 Build pxlViewer.exe on Windows
 Make sure pxlViewer works with no errors from your Command Prompt first!
 (Dedicated Windows exe download in repository to come soon, the exe has some needless bloat currently.)
 If pxlViewer works, to continue you'll need to have pyinstaller installed
To install pyinstaller, from your python/Scripts folder again-
 `cd C:\Python27\Scripts `
Run -
 `pip install pyinstaller `

Then browse to your pxlViewer download/extract folder and double click the  `buildExe.bat ` file.
This may take a couple minutes to build.

After this, you can right click an image, go to  `Open With... `, and navegate to-
C:\path\to\pxlViewer\dist\pxlViewer\pxlViewer.exe

If all is well, your image should open with pxlViewer!

 End of Windows Install
______________________________

 Thanks for checking out pxlViewer!
