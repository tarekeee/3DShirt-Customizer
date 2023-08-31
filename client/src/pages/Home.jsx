import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import {
  headContentAnimation,
  headContainerAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import state from "../store";
import Button from "../components/Button";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.div className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LETS'S <br className="xl:block hidden" /> DO IT
              </h1>
              <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                <p className="max-w-md font-normal text-gray-600 text-base">
                  Create your unique shirt-model with the help of our 3D
                  customization tool , <strong>Unleah your imagination</strong>{" "}
                  and define your own style.
                </p>

                <Button 
                type="filled"
                title="Customize it"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home;
