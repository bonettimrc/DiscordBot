const fs = require('fs')
module.exports = class Blasphemator {
    static init() {
        if (fs.existsSync(process.env.DATABASE_PATH))
            this.data = JSON.parse(fs.readFileSync(process.env.DATABASE_PATH))
        else {
            fs.writeFileSync(process.env.DATABASE_PATH, "")
        }
    }
    static updateEntities = (newEntity) => {
        if (this.data.entities.includes(newEntity)) return
        else {
            this.data.entities.push(newEntity)
            this.updateData()
        }
    }
    static updateDerogatories = (newDerogatory) => {
        if (this.data.derogatories.includes(newDerogatory)) return
        else {
            this.data.derogatories.push(newDerogatory)
            this.updateData()
        }
    }
    static updateData = () => {
        fs.writeFile(process.env.DATABASE_PATH, JSON.stringify(this.data), (err) => {
            if (err) throw err
        })
    }
    /**
     * takes the person that said the blasphemy and the group of people in which it was in, 
     * and adds them to the database, 
     * increasing the counter if they say another blasphemy
     * @param group 
     * @param person 
     */
    static processBlasphemy = (group, person) => {
        if (!(group in this.data.counter)) {
            this.data.counter[group] = {}
        }
        if (!(person in this.data.counter[group])) {
            this.data.counter[group][person] = 0
        }
        this.data.counter[group][person]++
        this.updateData()
    }
    static retrieveCounter = (group, person) => {
        if (group) {
            if (group in this.data.counter)
                return this.data.counter[group]
        }
        else if (group && person) {
            if (group in this.data.counter) {
                if (person in this.data.counter[group])
                    return this.data.counter[group][person]
            }
        }
        else {
            return this.data.counter
        }
    }
    /**
     * check if the argument is a blasphemy using the entities and the derogatories
     * @param blasfemy
     */
    static blasphemyCheck = (blasfemy) => {
        blasfemy = blasfemy.toLowerCase()
        let includesEntity = false
        let includesDerogatory = false
        this.data.entities.forEach(element => {
            if (blasfemy.includes(element)) {
                includesEntity = true
            }
        });
        this.data.derogatories.forEach(element => {
            if (blasfemy.includes(element)) {
                includesDerogatory = true
            }
        });
        if (includesEntity && includesDerogatory) {
            return true
        } else {
            return false
        }
    }
}