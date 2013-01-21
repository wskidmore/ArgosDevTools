window.Function.prototype.bindDelegate = function(scope) {
    var fn = this;

    if (arguments.length == 1) return function() {
        return fn.apply(scope || this, arguments);
    };

    var optional = Array.prototype.slice.call(arguments, 1);
    return function() {
        var called = Array.prototype.slice.call(arguments, 0);
        return fn.apply(scope || this, called.concat(optional));
    };
};

var fzip;
if (window.runtime)
{
    if (!fzip)
        fzip = {};
    fzip.FZip = window.runtime.deng.fzip.FZip;
    fzip.FZipFile = window.runtime.deng.fzip.FZipFile;
}

var airInterface = {},
    getFile = function(path) {
        var file = new air.File();
        file.nativePath = path;
        return file;
    },
    dirSelected = function(event, file, callback, scope) {
        callback.call(scope || this, file.url);
    };

airInterface.getAppDir = function() {
    return air.File.applicationDirectory;
};
airInterface.resolvePath = function(root, path) {
    var rootFolder = getFile(root);
    return rootFolder.resolvePath(path).url;
};
airInterface.readFile = function(filePath) {
    var file = getFile(filePath),
        fileStream = new air.FileStream();
    fileStream.open(file, air.FileMode.READ);
    var data = fileStream.readUTFBytes(fileStream.bytesAvailable);
    fileStream.close();
    return data;
};
airInterface.writeFile = function(data, filePath) {
    var file = getFile(filePath),
        fileStream = new air.FileStream();
    fileStream.open(file, air.FileMode.WRITE);
    fileStream.writeUTFBytes(data);
    fileStream.close();
};
airInterface.unzipFile = function(filePath, targetPath) {
    var file = getFile(filePath);
    var destFolder = getFile(targetPath);
    var zip = new fzip.FZip;

    destFolder.createDirectory();

    var isDir = function(name) {
        var parts = name.split('/');
        return (parts[parts.length - 1].indexOf('.') === -1);
    };

    var onComplete = function (event) {
        var count = zip.getFileCount();
        for ( var idx = 0; idx < count; idx++)
        {
            var zfile = zip.getFileAt(idx);
            var uzfile = destFolder.resolvePath(zfile.filename);

            if (isDir(uzfile.url))
            {
                uzfile.createDirectory();
            }
            else
            {
                var stream = new air.FileStream();
                stream.open( uzfile, air.FileMode.WRITE );
                stream.writeBytes( zfile.content,0, zfile.content.length );
                stream.close();
            }
        }
    };
    zip.addEventListener(air.Event.COMPLETE, onComplete);
    zip.load(new air.URLRequest(file.url));
};
airInterface.unzipFileURL = function(url, targetPath) {
    var temp = air.File.applicationStorageDirectory.resolvePath('tmp');

    var onComplete = function(e) {
        var zipFile = temp.resolvePath('downloaded.zip');
        var stream = new air.FileStream();
        stream.open(zipFile, air.FileMode.WRITE);
        stream.writeBytes(e.target.data);
        stream.close();
        airInterface.unzipFile(zipFile.nativePath, targetPath);
    };

    var request = new air.URLRequest(url);
    var loader = new air.URLLoader();
    loader.dataFormat = air.URLLoaderDataFormat.BINARY;
    loader.addEventListener(air.Event.COMPLETE, onComplete);
    loader.load(request);
};
airInterface.deleteFile = function(filePath) {
    var file = getFile(filePath);
    file.deleteFile();
};
airInterface.createFolder = function(dirPath) {
    var dir = getFile(filePath);
    dir.createDirectory();
};
airInterface.copyFolder = function(src, dest) {
    var sourceDir = getFile(src),
        resultDir = getFile(dest);
    sourceDir.copyTo(resultDir);
};
airInterface.browseForFolder = function(callback, scope) {
    var file = new air.File();
    file.addEventListener(air.Event.SELECT, dirSelected.bindDelegate(scope || this, file, callback, scope));
    file.browseForDirectory("Select a directory");
};


// debugging
//airInterface.unzipFileURL('https://github.com/Contatta/argos-sdk/archive/master.zip', 'C:/code/testing');
