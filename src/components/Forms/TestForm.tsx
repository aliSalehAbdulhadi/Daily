import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TestForm = () => {
  const [first, setfirst] = useState('');

  const setFocus = (ref: any) => {
    ref?.focus();
  };
  return (
    <div>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorRef={setFocus}
      />
    </div>
  );
};

export default TestForm;
