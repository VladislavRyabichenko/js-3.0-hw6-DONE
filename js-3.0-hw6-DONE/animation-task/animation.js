const blocks = document.querySelectorAll(".box");
const successImg = document.querySelector(".success-img");
const errImg = document.querySelector(".err-img");
const container = document.querySelector("#container");


function finalMessageSuccess(elem) {
    setTimeout(()=>{
        successImg.classList.add("active");
    },1000);

    setTimeout(()=>{
        successImg.classList.remove("active");
    },2500);
    return true;
}
function finalMessageErr() {
    setTimeout(()=>{
        errImg.classList.add("active");
    },0);

    setTimeout(()=>{
        errImg.classList.remove("active");
    },2500);
    console.log("ERR");
}

function setDefaults(blocks) { // return blocks to the start position
    blocks.forEach((elem) => {
        elem.classList.remove("move");
        elem.style.transform = `translate(${0}px, ${0}px)`;
    })

    let targets = document.querySelectorAll('.target');
    targets.forEach((elem) => elem.remove());
}

function createArrOfBlocks (blocks) { // create objects with target coordinates
    let tempArr = [];
    let x_coordinate = 200; // target x
    let y_coordinate = 0; // target y

    for (let i = 0; i < blocks.length; i++) {
        y_coordinate += 120;

        let currentObj = {
            id: i,
            elem: blocks[i],
            target_x : x_coordinate,
            target_y : y_coordinate
        }

        tempArr.push(currentObj);
    }
    return tempArr;
}
let blocksWithTargetCoords = createArrOfBlocks(blocks);


const getObjectInfo = (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (!blocksWithTargetCoords[id]) {
            reject("ERROR: out of range");
        }
        resolve(blocksWithTargetCoords[id]);
    },1000);
})


function moveToTarget(obj) {
    let element = obj.elem;

    // show target where block will be moved
    let targetBlock = document.createElement("div");
    targetBlock.classList.add("target");

    targetBlock.style.transform = `translate(${obj.target_x}px, ${obj.target_y}px)`;
    targetBlock.innerHTML = element.innerHTML
    container.append(targetBlock);


    element.classList.add('move');
    element.style.transform = `translate(${obj.target_x}px, ${obj.target_y}px)`;


    if (obj.id+1 >= blocksWithTargetCoords.length) {
        finalMessageSuccess()
    }

}




let p1 = getObjectInfo(0)
let p2 = getObjectInfo(1)
let p3 = getObjectInfo(2)

document.addEventListener('DOMContentLoaded', function () {
    let goBtnAll = document.querySelector(".go-btn-all");
    // move all blocks at the same time
    goBtnAll.addEventListener("click", ()=>{
        Promise.allSettled([p1, p2,p3])
            .then(
                (results) => results.forEach((res) => moveToTarget(res.value)))
            .catch((err) => {
                console.log(err.message);
            })
    })
});



document.addEventListener('DOMContentLoaded', function () {
    let setDefVal = document.querySelector(".set-def");
    setDefVal.addEventListener("click", ()=>{
        setDefaults(blocks);
    });
});

document.addEventListener("DOMContentLoaded", function (){
    let goBtnStepByStep = document.querySelector(".go-btn-step-by-step");
    goBtnStepByStep.addEventListener("click", ()=>{
        //move blocks 'step by step'

        getObjectInfo(0)
            // uncomment this to get 'out of the range error'
            // .then((obj) => {
            //     moveToTarget(obj);
            //     return getObjectInfo(11);
            // })

            .then((obj) => {
                moveToTarget(obj);
                return getObjectInfo(1);
            }).then((obj) => {
            moveToTarget(obj);
            return getObjectInfo(2);
        }).then((obj) => {
            moveToTarget(obj);

        })
            .catch((e => {
                console.log(e);
                finalMessageErr();
                setDefaults(blocks);

            }))

    })
})































