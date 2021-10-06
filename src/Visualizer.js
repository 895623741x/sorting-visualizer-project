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

   const init = () => {
      if (isSorting) return;

      if (isFinished) {
         // resetBarsColor();
         reset();
      }
      setIsFinished(false);
      const array = [];
      for (let i = 0; i < 60; i++) {
         array.push(randomizeValues(10, 500));
      }
      setArrays(array);
   };

   useEffect(() => {
      init();
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

   // Bubble Sort

   function animateArrayUpdate(animations) {
      if (isSorting) return;
      setIsSorting(true);
      animations.forEach(([comparison, swapped], index) => {
         setTimeout(() => {
            if (!swapped) {
               if (comparison.length === 2) {
                  const [i, j] = comparison;
                  animateArrayAccess(i);
                  animateArrayAccess(j);
               } else {
                  const [i] = comparison;
                  animateArrayAccess(i);
               }
            } else {
               setArrays((prevArr) => {
                  const [k, newValue] = comparison;
                  const newArr = [...prevArr];
                  newArr[k] = newValue;
                  return newArr;
               });
            }
         }, index * 5);
      });
      setTimeout(() => {
         animateSortedArray();
      }, animations.length * 5);
   }

   function animateArrayAccess(index) {
      const arrayBars = containerRef.current.children;
      const arrayBarStyle = arrayBars[index].style;
      setTimeout(() => {
         arrayBarStyle.backgroundColor = "red";
      }, 5);
      setTimeout(() => {
         arrayBarStyle.backgroundColor = "";
      }, 5 * 2);
   }

   function animateSortedArray() {
      const arrayBars = containerRef.current.children;
      for (let i = 0; i < arrayBars.length; i++) {
         const arrayBarStyle = arrayBars[i].style;
         setTimeout(() => (arrayBarStyle.backgroundColor = "purple"), i * 5);
      }
      setTimeout(() => {
         setIsFinished(true);
         setIsSorting(false);
      }, arrayBars.length * 5);
   }

   function reset() {
      const arrayBars = containerRef.current.children;
      for (let i = 0; i < arrays.length; i++) {
         const arrayBarStyle = arrayBars[i].style;
         arrayBarStyle.backgroundColor = "pink";
      }
   }

   return (
      <div className="container">
         <div className="header">
            <h2>Sorting Algorithm Visualizer</h2>
         </div>
         <div className="bars-area" ref={containerRef}>
            {arrays.map((value, index) => (
               <div
                  className="bar"
                  style={{ height: `${value}px`, backgroundColor: "pink" }}
                  data-tooltip={value}
                  key={index}
               >
                  {/* <div className="avatar" data-tooltip={value}></div> */}
               </div>
            ))}
         </div>
         <div className="buttons">
            <button onClick={init}>Rest the Bars</button>
            <button onClick={quickSort} className="login-btn">
               Quick Sort
            </button>
            <button onClick={mergeSort}>Merge Sort</button>
            <button onClick={insertionSort}>Insertion Sort</button>
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
