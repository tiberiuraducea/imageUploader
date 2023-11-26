import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImageGallery = ({ images, startingIndex = 0 }) => {
  const [[page, direction], setPage] = useState([startingIndex, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  if (images?.length === 0) {
    return null;
  }

  const buttonClasses = 'absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 text-2xl font-bold text-dog-green hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dog-green';

  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          className='absolute max-w-full object-contain'
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <button type='button' role='button' className={`${buttonClasses} left-0 text-3xl rotate-180`} onClick={() => paginate(1)}>
        {"‣"}
      </button>
      <button type='button' role='button' className={`${buttonClasses} right-0 text-3xl`} onClick={() => paginate(-1)}>
        {"‣"}
      </button>
    </div>
  );
};

export default ImageGallery;
