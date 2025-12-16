import { default as Base } from "./base.js"
import { default as Animation } from "./anime.js"

const animationClasses = ['anibutout', 'anibut']
const animFormpost = new Animation(formpost, animationClasses)
const animFormshow = new Animation(formshow, animationClasses)
const animFormrem = new Animation(formrem, animationClasses)

class Domcontrol {
    table(arr) {
        const table = document.createElement('table')
        const tHead = this.tableHead(arr);
        const tBody = this.tableBody(arr)
        table.appendChild(tHead)
        table.appendChild(tBody)
        return table
    }
    // arr --> [], elem --> Nobj, create --> text element
    appChild(arr, elem, create) {
        arr.forEach(key => {
            const element = document.createElement(create);
            element.textContent = key;
            elem.appendChild(element);
        });
    }
    // arr --> [{},{},..]
    tableHead(arr) {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        if (arr.length > 0) {
            let obj = Object.keys(arr[0])
            this.appChild(obj, tr, 'th')
        } else {
            this.appChild(["no matches"], tr, 'th')
        }
        thead.appendChild(tr)
        return thead
    }
    // arr --> [{}]
    tableBody(arr) {
        const tbody = document.createElement("tbody")
        arr.forEach(obj => {
            const val = Object.values(obj)
            const tr = document.createElement('tr');
            this.appChild(val, tr, 'td')
            tbody.appendChild(tr);
        });
        return tbody
    }
}

menubuts.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.nodeName != 'A') return;
    else if (event.target.innerText == "Add") {
        animFormpost.add()
    }
    else if (event.target.innerText == "Remove") {
        animFormrem.add()
    }
    else if (event.target.innerText == "Show") {
        animFormshow.add()
    };
})

// disable input when choice all. And clear input
datalist.addEventListener('change', (e) => {
    usershow.value = ''
    if (e.target.value == "all") {
        usershow.setAttribute('disabled', '')
    } else {
        usershow.removeAttribute('disabled')
    }
})
//  make request, remove table if has, and create new table with users
formshow.addEventListener('submit', async (e) => {
    e.preventDefault()
    let result
    if (usershow.value) {
        const user = {
            [datalist.value]: usershow.value
        }
        result = await new Base().post('/api/user', user)
    } else {
        result = await new Base().get('/api/users')
    }

    usertable.childElementCount ? usertable.firstChild.remove() : false
    const table = new Domcontrol().table(result)
    usertable.append(table);
})

// POST user, if has table -> append user
formpost.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputs = formpost.querySelectorAll('input')
    const fdata = new FormData(formpost)
    const objInput = Object.fromEntries(fdata)
    const resp = new Base().post("/api/users/", objInput)
    resp.then((val) => {
        if (usertable.children.length) {
            let tbody = usertable.querySelector('tbody')
            let tr = document.createElement('tr')
            let header = usertable.querySelector('thead')
            header.firstChild.childNodes.forEach(el => {
                let eltext = el.innerText
                const td = document.createElement('td');
                td.textContent = val[eltext];
                tr.appendChild(td);
            })
            tbody.appendChild(tr)
        }
    })
    inputs.forEach((input) => {
        if (input.type == 'text') { input.value = "" }
    })
})
// DELETE
formrem.addEventListener('submit', (event) => {
    event.preventDefault()
    let fdata = new FormData(formrem)
    const id = fdata.get('rem')
    const answer = new Base().del("/api/users/" + id)
    inputrem.value = ''
    if (usertable.children.length) {
        answer.then((val) => {
            if (val.status == 200) {
                let ubody = usertable.querySelector('tbody')
                ubody.childNodes.forEach((tr) => {
                    if (tr.firstChild.innerText == id) {
                        tr.remove()
                    }
                })
            }
        })
    }
})




