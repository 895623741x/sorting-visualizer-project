import React, { useState, useRef, useEffect } from "react";
import { getMergeSortAnimations } from "./Algorithms/MergeSort";
import { getQuickSortAnimations } from "./Algorithms/QuickSort";
import { getInsertionSortAnimations } from "./Algorithms/InsertionSort";

import "./Visualizer.css";

function Visualizer() {
   const [arrays, setArrays] = useState([]);
   const [isSorting, setIsSorting] = useState(false);
   const [isFinished, setIsFinished] = useState(false);
   const containerRef = useRef(null);
   console.log(arrays);
   const initializeArrays = () => {
      if (isSorting) return;

      if (isFinished) {
         resetBarsColor();
      }
      setIsFinished(false);
      const array = [];
      for (let i = 0; i < 100; i++) {
         array.push(randomizeValues(10, 500));
      }
      setArrays(array);
   };

   useEffect(() => {
      initializeArrays();
   }, []);

   const mergeSort = () => {
      const animations = getMergeSortAnimations(arrays);
      animateArrayUpdate(animations);
   };
   const quickSort = () => {
      const animations = getQuickSortAnimations(arrays);
      animateArrayUpdate(animations);
   };
   const insertionSort = () => {
      const animations = getInsertionSortAnimations(arrays);
      animateArrayUpdate(animations);
   };

   const animateArrayUpdate = (animations) => {
      if (isSorting) return;
      setIsSorting(true);

      animations.forEach(([comparison, swapped], index) => {
         setTimeout(() => {
            if (!swapped) {
               if (comparison.length === 2) {
                  const [i, j] = comparison;
                  render(i);
                  render(j);
               } else {
                  const [i] = comparison;
                  render(i);
               }
            } else {
               setArrays((prevArray) => {
                  const [k, newValue] = comparison;
                  const newArray = [...prevArray];
                  newArray[k] = newValue;
                  return newArray;
               });
            }
         }, index * 5);

         setTimeout(() => {
            animateSortedArray();
         }, animations.length * 5);
      });
   };

   const render = (index) => {
      const bars = containerRef.current.children;
      const barStyle = bars[index].style;

      //rendering the bar
      setTimeout(() => {
         barStyle.backgroundColor = "red";
      }, 5);

      // after we render the bar
      setTimeout(() => {
         barStyle.backgroundColor = "";
      }, 10);
   };

   const animateSortedArray = () => {
      const bars = containerRef.current.children;

      for (let i = 0; i < bars.length; i++) {
         const barStyle = bars[i].style;

         setTimeout(() => {
            barStyle.backgroundColor = "purple";
         }, i * 5);
      }

      setTimeout(() => {
         setIsFinished(true);
         setIsSorting(false);
      }, bars.length * 5);
   };

   const resetBarsColor = () => {
      const bars = containerRef.current.children;

      for (let i = 0; i < bars.length; i++) {
         bars[i].style.backgroundColor = "pink";
      }
   };

   return (
      <div>
         <div className="header">
            <h2>Sorting Algorithm Visualizer</h2>
         </div>
         <div className="bars-area" ref={containerRef}>
            {arrays.map((value, index) => (
               <div className="bar" style={{ height: `${value}px`, backgroundColor: "pink" }} key={index}></div>
            ))}
         </div>
         <div className="buttons">
            <button onClick={initializeArrays}>Rest the Bars</button>
            <button onClick={quickSort}>Quick Sort</button>
            <button onClick={mergeSort}>Merge Sort</button>
            <button onClick={insertionSort}>Insertion Sort</button>
            <button>Bubble Sort</button>
         </div>
      </div>
   );
}

const randomizeValues = () => {
   const MIN = 10;
   const MAX = 500;

   return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
};

export default Visualizer;
