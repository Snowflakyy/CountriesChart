

const header = document.querySelector('.header')

const populationBtn = document.querySelector('#pop')

const languageBtn = document.querySelector('#lang')

const countryDiv = document.querySelector('.country-content')

const textInfo = document.querySelector('#text-info')

const countryCount = document.querySelector("#current-count")

populationBtn.addEventListener('click',()=>{
    onBtnClick('population')
})
languageBtn.addEventListener('click',()=>{
    onBtnClick('language')
})

const onBtnClick = (name)=>{
    countryCount.textContent='Currently we have 250 countries'
    countryDiv.innerHTML=''
    const worldPop = countries_data.reduce((acc,cur)=>{
        const res = Number(cur.population)
        return acc+res;
    },0)
    const top10Countries = countries_data.sort((a,b)=>b.population-a.population).slice(0,10)
    const countryArr = [{ name: 'World', population: worldPop },...top10Countries]
    const langArr = get10mostSpokenLang()
    for(let i =0;i<3;i++){
        let divy = addElement('div',`country-container country-container${String.fromCharCode(i+65)}`)
         countryDiv.appendChild(divy)}

         const countryContainerName = countryDiv.children[0]
  const countryContainerVis = countryDiv.children[1]
  const countryContainerNum = countryDiv.children[2]

    if(name=='population'){
        textInfo.textContent ='Top 10 Most Populated Countries'

        for(let i=0;i<countryArr.length;i++){
            let text = addElement('h3','countryName')
            text.textContent = countryArr[i].name
            countryContainerName.appendChild(text)
            
            let divy=addElement('div','countrySize')
            const percentage = (countryArr[i].population/worldPop)*100
            divy.style.width=`${percentage}%`
            divy.style.setProperty('--varwidth', `${percentage}%`);
            countryContainerVis.appendChild(divy)
    
            let number = addElement('h3','countryNum')
            number.textContent = countryArr[i].population
            countryContainerNum.appendChild(number)
        }

    

    }
    else if(name=='language'){
        textInfo.textContent ='Top 10 Most Spoken Languages'
        
        for(let i=0;i<langArr.length;i++){
            let text = addElement('h3','countryName')
            text.textContent = langArr[i][0]
            countryContainerName.appendChild(text)
            
            let divy=addElement('div','countrySize')
            const percentage = langArr[i][1]
            divy.style.width = `${percentage}%`
            divy.style.setProperty('--varwidth', `${percentage}%`);
            countryContainerVis.appendChild(divy)
    
            let number = addElement('h3','countryNum')
            number.textContent = langArr[i][1]
            countryContainerNum.appendChild(number)
        }
    }


}

const get10mostSpokenLang = ()=>{
    const languagesMap = new Map()
    for(country of countries_data){
        for(language of country.languages){
            if(languagesMap.has(language)){
                let currentcount = languagesMap.get(language);
                languagesMap.set(language,currentcount+1)
            }
            else{
                languagesMap.set(language,1)
            }
        }
    }
    const res = [...languagesMap.entries()].sort((a,b)=>b[1]-a[1]).slice(0,10)
    return res

}

const addElement = (type,className,idName)=>{
    const elementy = document.createElement(type)
    let classes = className.split(' ')
    for(let i =0;i<classes.length;i++)
    elementy.classList.add(classes[i])
    if(idName!=null){
        elementy.id=idName
    }
    return elementy;
}