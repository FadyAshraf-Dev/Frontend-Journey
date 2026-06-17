        let text = document.querySelector("div")
        let btn = document.querySelector("button")
        let span = document.querySelector("span")
        let p = document.querySelector("p")
        let i=0
        intervalSpan = 50
        let intervalID = null;
        p.style.transitionDuration = `${intervalSpan}ms`

        btn.addEventListener("click", ()=>{
            if (intervalID !==null){
                clearInterval(intervalID);
                p.style.transitionDuration = `0ms`
                text.innerText=`0%`


            }
            if(i==101){
                p.style.transitionDuration = `0ms`
                text.innerText=`0%`
            }
            i=0
            intervalID = setInterval(()=>{
            if (i==1){
                p.style.transitionDuration = `${intervalSpan}ms`

            }   

            if (i == 100){
                clearInterval(intervalID)

            }
            let WtB = `rgb(${255-2.55*i}, ${255-2.55*i}, ${255-2.55*i})`
            let BtW = `rgb(${2.55*i}, ${2.55*i}, ${2.55*i})`
            // btn.style.color = WtB
            // btn.style.backgroundColor = BtW
            p.style.backgroundColor = WtB
            span.style.backgroundColor = BtW
            // text.style.color =BtW
            text.innerText = `${i}%`
            p.style.width = `${i}%`
            i++
        },intervalSpan)

        })
