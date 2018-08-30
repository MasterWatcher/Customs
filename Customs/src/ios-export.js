export default function(context) {
    
    var colors = getColors()
    var savePanel = NSSavePanel.savePanel()
    savePanel.setNameFieldStringValue('Colors.xcassets')
    savePanel.setAllowsOtherFileTypes(true)
    savePanel.setExtensionHidden(false)
    if (savePanel.runModal()) {
        exportAsFile(colors, savePanel.URL());
    }
}

function getColors() {
    var result = []
    var sketch = require('sketch')  
    var document = sketch.getSelectedDocument()    
    var layers = document.getLayersNamed('Colors')
    if (layers.length) {
        var groupLayers = layers[0].layers
        groupLayers.forEach(function (shape, i) {
            console.log(shape.name + ' ' + shape.style.fills[0].color)
            result.push({name: shape.name, color: shape.style.fills[0].color})
        })
    } else {
        context.document.showMessage('there is no folder "Colors" in the document')
    }
    return result
}

function exportAsFile(colors, url) {
    var manager = NSFileManager.defaultManager()
    
    // var content = contentsJSON() 
    // var path = url.path()
    // var fileString = NSString.stringWithString(JSON.stringify(content, null, 4))
    // fileString.writeToFile_atomically_encoding_error(path + "/Contents.json", true, NSUTF8StringEncoding, null)

    colors.forEach(function (colorData, i) {
        var content = contentsJSON(colorData) 
        var fileName = colorData.name + '.colorset'
        var colorsetURL = url.URLByAppendingPathComponent(fileName);
        manager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(colorsetURL.path(), true, null, null)
        var path = colorsetURL.path()
        var fileString = NSString.stringWithString(JSON.stringify(content, null, 4))
        fileString.writeToFile_atomically_encoding_error(path + "/Contents.json", true, NSUTF8StringEncoding, null)
    })
}

function contentsJSON(colorData) {
    return {
        info: {
          version: 1,
          author: "com.goncharov.sketch.customs"
        },
        colors: [colorObject(colorData)]
      }
}

function colorObject(colorData) {
    return {
        idiom : "universal",
        color : {
            "color-space" : "display-p3",
            components : {
              red : '0x' + colorData.color.substring(1, 3),
              green : '0x' + colorData.color.substring(3, 5),
              blue : '0x' + colorData.color.substring(5, 7),
              alpha : '0x' + colorData.color.substring(7, 9)
            }
        }
    }
}






