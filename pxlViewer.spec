# -*- mode: python -*-

block_cipher = None

addedData = {
            ('README.md','.'),
            ('README.txt','.'),
            ('html\\index.htm','html\\.'),
            ('html\\style.css','html\\.'),
            ('html\\js\\*.js','html\\js'),
            }

a = Analysis(['pxlViewer.py'],
             pathex=['E:\\projects\\pxlViewer'],
             binaries=[],
             datas=addedData,
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='pxlViewer',
          debug=False,
          strip=False,
          upx=True,
          console=False )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               name='pxlViewer')
