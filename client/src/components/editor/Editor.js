import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react";
import { Box, styled } from "@mui/material";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Ensure Quill styles are imported


const Container = styled(Box)`
  margin-top: 15px;
  border-radius:10px;
`

const Editor = forwardRef(({ readOnly, defaultValue, onChange, onSelectionChange }, ref) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const [content, setContent] = useState(defaultValue || ""); // State to store editor content


  useEffect(() => {
    if (  !containerRef.current || quillRef.current ) return;

    const editorContainer = document.createElement("div");
    containerRef.current.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      theme: "snow",
      readOnly: readOnly || false,
      placeholder:"Start Writing..."
    });

    quillRef.current = quill;
   if (ref) ref.current = quill; // Assign quill instance to ref

    if (defaultValue) {
    //   quill.setContents(defaultValue);
    quill.root.innerHTML= defaultValue;
    }

    quill.on("text-change", () => {
      //if (onTextChange) onTextChange(...args);
      const html = quill.root.innerHTML.trim();
      setContent(html);
        if (onChange) onChange(html); // Ensure onChange gets text
    });

    console.log(content);

    // quill.on("selection-change", (...args) => {
    //   if (onSelectionChange) onSelectionChange(...args);
    // });

    // return () => {
    //     if (quillRef.current) {
    //       quillRef.current.off("text-change");
    //       quillRef.current.off("selection-change");
    //     }
    //     quillRef.current = null;
    //     if (ref) ref.current = null;
  
    //     // Check if containerRef.current exists before modifying it
    //     if (containerRef.current) {
    //       containerRef.current.innerHTML = "";
    //     }
    //   };
    // }, [readOnly, defaultValue, onTextChange, onSelectionChange, ref]);

    return () => {
        quillRef.current?.off("text-change");
       // quillRef.current?.off("selection-change");
        quillRef.current = " ";
  
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        // quill.off("text-change");
      };
    }, [readOnly, defaultValue]);


    // Expose content retrieval to parent via ref
  // useImperativeHandle(ref, () => ({
  //   getContent: () => quillRef.current?.root.innerHTML || "",
  // }));

 // return <Box ref={containerRef} sx={{ minHeight: "200px", border: "1px solid #ccc", padding: "10px" }} />;
});

Editor.displayName = "Editor";

export default Editor;
