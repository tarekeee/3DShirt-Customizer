import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import config from "../config/config";
import state from "../store";
import { useSnapshot } from "valtio";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { AiPicker, ColorPicker, FilePicker, Button, Tab } from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logo: true,
    textue: false,
  });
  const generateTabContent = () => {
    const handleSubmit = async (type) => {
      if (!prompt) return alert("Please enter a prompt");
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        handleDecals(type,`data:image/png;base64,${data.photo}`)
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
        setActiveEditorTab("");
      }
    };
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} readFile={readFile} setFile={setFile} />;
      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleActiveFilterTab = (tab) => {
    switch (tab) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tab];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tab];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    setActiveFilterTab((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className=" absolute top-9 left-0"
            {...slideAnimation("left")}
          >
            <div className="flex z-50 items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Button
              type="filled"
              title={"Go Back"}
              handleClick={() => {
                state.intro = true;
              }}
              customStyles={"w-fit px-4 py-2.5 font-bold text-sm"}
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                key={tab.id}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
