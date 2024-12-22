import { useEffect, useRef, useState } from "react";
import { CiFileOn } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { VscNewFolder } from "react-icons/vsc";

const FileIcon = ({ type = "file", expend }) => {
  return type === "file" ? (
    <CiFileOn />
  ) : (
    <MdArrowForwardIos
      className="folder-arrow"
      style={{
        transform: `rotate(${expend ? "90" : "0"}deg)`,
      }}
    />
  );
};

const Folder = ({ name, children: childrenProp = [] }) => {
  const [expend, setExpend] = useState(false);
  const [create, setCreate] = useState(null);
  const [children, setChildren] = useState(childrenProp);
  const inputRef = useRef();
  const handleCreateNew = (type) => {
    setExpend(true);
    setCreate(type);
  };
  const createNew = (type, name) => {
    const isFolder = type === "folder";
    const obj = { name, isFolder, children: isFolder ? [] : null };
    const folders = children.filter((child) => child.isFolder);
    const files = children.filter((child) => !child.isFolder);
    setChildren([...folders, obj, ...files]);
    setCreate(null);
  };

  useEffect(() => {
    if (create) {
      if (inputRef.current) inputRef.current.focus();
    }
  }, [create]);
  return (
    <div>
      <div className="folder">
        <div onClick={() => setExpend((prev) => !prev)}>
          <FileIcon type="folder" expend={expend} />
          {name}
        </div>
        <div>
          <button onClick={() => handleCreateNew("file")}>
            <VscNewFile />
          </button>
          <button onClick={() => handleCreateNew("folder")}>
            <VscNewFolder />
          </button>
        </div>
      </div>

      <div className="folder-children">
        {create && (
          <div className={create}>
            <FileIcon type={create} />
            <input
              className={"input-" + create}
              ref={inputRef}
              onBlur={() => {
                if (inputRef.current) {
                  const text = inputRef.current.value.trim();
                  if (text == "") setCreate(null);
                  else createNew(create, text);
                }
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter")
                  if (inputRef.current) {
                    const text = inputRef.current.value.trim();
                    if (text == "") setCreate(null);
                    else createNew(create, text);
                  }
              }}
            />
          </div>
        )}
        {expend &&
          children.map((child, id) => (
            <File key={"file-" + id + "-" + child.name} {...child} />
          ))}
      </div>
    </div>
  );
};
const File = ({ name, children, isFolder = false }) => {
  if (!isFolder)
    return (
      <div className="file">
        <FileIcon /> {name}{" "}
      </div>
    );
  return <Folder name={name} children={children} />;
};

export default File;
