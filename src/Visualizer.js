import React, { useState, useRef, useEffect } from "react";
import { getMergeSortAnimations } from "./Algorithms/MergeSort";
import { getQuickSortAnimations } from "./Algorithms/QuickSort";
import { getInsertionSortAnimations } from "./Algorithms/InsertionSort";

import "./Visualizer.css";

function Visualizer() {
   const [array, setArray] = useState([]);
   const [isSorting, setIsSorting] = useState(false);
   const [isFinished, setIsFinished] = useState(false);
   const containerRef = useRef(null);

   const initializeArrays = () => {
      const array = [];
      for (let i = 0; i < 100; i++) {
         array.push(randomizeValues(10, 500));
      }
      setArray(array);
   };

   useEffect(() => {
      initializeArrays();
   }, []);

   const mergeSort = (array) => {
      const animations = getMergeSortAnimations(array);
   };

   return (
      <div>
         <div className="header">
            <h2>Sorting Algorithm Visualizer</h2>
         </div>
         <div className="bars-area">
            {array.map((value, index) => (
               <div className="bar" style={{ height: `${value}px` }} key={index}></div>
            ))}
         </div>
         <div className="buttons">
            <button>Quick Sort</button>
            <button>Merge Sort</button>
            <button>Insertion Sort</button>
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
