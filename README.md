# CostumeX
An example extension for [Xcratch](https://xcratch.github.io/)

This extension add extra blocks to manipulate costumes of a sprite in Xcratch.
By using this extension, you have a block to add a costume from a data URL. You can also take a snapshot of the stage and get data URL of that image. 


## ✨ What You Can Do With This Extension

Play [Example Project](https://xcratch.github.io/editor/#https://yokobond.github.io/xcx-costumex/projects/example.sb3) to look at what you can do with "CostumeX" extension. 

This project takes snapshots of the stage and saves them as costumes of a sprite. You can change the interval of taking snapshots and the number of costumes to keep. You can also change the size and position of the snapshots.

<iframe src="https://xcratch.github.io/editor/player#https://yokobond.github.io/xcx-costumex/projects/example.sb3" width="540px" height="460px"></iframe>


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
