# CostumeX
Costume enhancement extension for [Xcratch](https://xcratch.github.io/)

This extension adds extra blocks to manipulate costumes of a sprite in Xcratch. With this extension, you can:
- Insert costumes from data URLs with custom position and size
- Take snapshots of the stage at specific coordinates and dimensions
- Capture video frames from the camera
- Get costume data as data URLs
- Query costume dimensions (width, height, center position)
- Flip costumes horizontally or vertically
- Delete costumes
- Get costume names and count 


## ✨ What You Can Do With This Extension

Play [Example Project](https://xcratch.github.io/editor/#https://yokobond.github.io/xcx-costumex/projects/example.sb3) to look at what you can do with "CostumeX" extension. 

This project takes snapshots of the stage and saves them as costumes of a sprite. You can change the interval of taking snapshots and the number of costumes to keep. You can also change the size and position of the snapshots.

<iframe src="https://xcratch.github.io/editor/player#https://yokobond.github.io/xcx-costumex/projects/example.sb3" width="540px" height="460px"></iframe>


## 📦 Blocks

### Costume Management
- **insert costume [NAME] at [INDEX] width [WIDTH] height [HEIGHT] with image [DATA]** - Insert a costume from a data URL at a specific index with custom dimensions
- **flip costume [COSTUME] [DIRECTION]** - Flip a costume horizontally (left-right) or vertically (up-down)
- **delete costume [COSTUME]** - Delete a specific costume

### Image Capture
- **snapshot center x:[X] y:[Y] w:[WIDTH] h:[HEIGHT]** - Take a snapshot of the stage at specified coordinates and dimensions, returns data URL
- **capture video center x:[X] y:[Y] w:[WIDTH] h:[HEIGHT]** - Capture a video frame from the camera at specified coordinates and dimensions, returns data URL

### Costume Information
- **image data of costume [COSTUME]** - Get the data URL of a costume
- **[DIMENSION] of costume [COSTUME]** - Get width, height, center x, or center y of a costume (scaled by sprite size)
- **costumes length** - Get the total number of costumes
- **costume name at [INDEX]** - Get the name of a costume at a specific index (1-based)


## How to Use in Xcratch

This extension can be used with other extension in [Xcratch](https://xcratch.github.io/). 
1. Open [Xcratch Editor](https://xcratch.github.io/editor)
2. Click 'Add Extension' button
3. Select 'Extension Loader' extension
4. Type the module URL in the input field 
```
https://yokobond.github.io/xcx-costumex/dist/costumex.mjs
```
5. Click 'OK' button
6. Now you can use the blocks of this extension


## Development

### Install Dependencies

```sh
npm install
```

### Setup Development Environment

Change ```vmSrcOrg``` to your local ```scratch-vm``` directory in ```./scripts/setup-dev.js``` then run setup-dev script to setup development environment.

```sh
npm run setup-dev
```

### Bundle into a Module

Run build script to bundle this extension into a module file which could be loaded on Xcratch.

```sh
npm run build
```

### Watch and Bundle

Run watch script to watch the changes of source files and bundle automatically.

```sh
npm run watch
```

### Test

Run test script to test this extension.

```sh
npm run test
```


## 🏠 Home Page

Open this page from [https://yokobond.github.io/xcx-costumex/](https://yokobond.github.io/xcx-costumex/)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/yokobond/xcx-costumex/issues). 
