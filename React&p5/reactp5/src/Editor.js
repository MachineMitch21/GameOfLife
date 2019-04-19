import React from 'react';

const Editor = (props) => {
    return (
        <div 
            onMouseDown={props.onEditorMouseDown}
            onMouseUp={props.onEditorMouseUp}
            id="editor"
            style={{
                "left": props.data.pos.x,
                "top": props.data.pos.y,
                "width": `${props.data.size.w}px`,
                "height": `${props.data.size.h}px`
            }}
            className="float-sm-none float-lg-left h-75 p-4 m-4"
        >
            <div 
                className="btn btn-light"
            >Test</div>
        </div>
    );
};

export default Editor;
