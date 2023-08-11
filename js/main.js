let input = document.querySelector('.search__input');
// let option = document.querySelector('#search-form').children
let list = document.querySelector('.repo-list')
let listItems = Array.from(document.querySelectorAll('li'))
let resContainer = document.querySelector('.results-container')
let nameField = document.querySelector('.name-field')
let ownerField = document.querySelector('.owner-field')
let starsField = document.querySelector('.stars-field')



const debounce = (fn, ms) => {
    let timer

    return () => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn();
        }, ms);

    }
};





async function getRepo () {
    
    if (input.value === '') {
        return
    } else {
        let response = await fetch(`https://api.github.com/search/repositories?q=${input.value}+in:name&sort=stars&order=desc`)
        let result = await response.json()
        console.log(result)
        
        if (result.total_count === 0) {
            console.log('OOPS! i guess nothing was found!')
        } else {
            list.classList.add('active')
            

            let fullName = result.items.slice(0, 5).map((item) => {
                return item.full_name
            })

            
            for (let i = 0; i < 5; i++) {
                listItems[i].textContent = fullName[i]
            }

        }


    input.value = ''
    }
    
}





list.addEventListener('click', async (e) => {
    let target = e.target.textContent
    

    let div = document.createElement('div')
        div.classList.add('results')

    let wrapper = document.createElement('div')

    if (target === '') {
        return
    } else {
        let f = await fetch(`https://api.github.com/search/repositories?q=${target}+in:name&sort=stars&order=desc`)
        let res = await f.json()
        let arr = res.items.slice(0,1)

        
        let pName = document.createElement('p')
        pName.classList.add('text')
        pName.textContent = arr.map(item => {
            return `name: ${item.name}`
        })
        wrapper.append(pName)

        let pOwner = document.createElement('p')
        pOwner.classList.add('text')
        pOwner.textContent = arr.map(item => {
            return `owner: ${item.full_name}`
        })
        wrapper.append(pOwner)

        let pStar = document.createElement('p')
        pStar.classList.add('text')
        pStar.textContent = arr.map(item => {
            return `stars: ${item.stargazers_count}`
        })


        let closeBtnWrap = document.createElement('div')
        closeBtnWrap.classList.add('closeBtn')
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        span1.classList.add('divider', 'first')
        span2.classList.add('divider', 'second')
        closeBtnWrap.append(span1, span2)


        

        wrapper.append(pStar)

        

        resContainer.append(div)
        div.append(wrapper)
        div.append(closeBtnWrap)
        closeBtnWrap.addEventListener('click', (e) => {
            e.target.closest('.results').remove()
        })
    }
    
})







// name.stargazers_count.full_name

input.addEventListener('input', debounce(getRepo, 1000))