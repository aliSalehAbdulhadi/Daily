import React, { useState } from 'react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToMarkdown from 'draftjs-to-markdown';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import dynamic from 'next/dynamic';

const TestForm = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );
  const setFocus = (ref: any) => {
    ref?.focus();
  };
  return (
    <div>
      <Editor
        editorState={editorState}
        editorRef={setFocus}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />

      <ReactQuill readOnly theme="bubble" value={editorState} />
    </div>
  );
};

export default TestForm;
