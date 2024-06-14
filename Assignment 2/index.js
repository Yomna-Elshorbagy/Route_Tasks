const fs = require ('fs')
const http = require('http')

// Students Api:
const server = http.createServer((req, res)=>{
    const {url , method} = req;
    res.setHeader('content-type', 'application/json');

    const sendRes = (code, msg)=>{
        res.statusCode = code;
        return res.end(JSON.stringify(msg))
    }
// student CRUD:
//Get all students:
    if (url == '/students' && method == 'GET'){
       let students = fs.readFileSync('student.json', 'utf8');
    //    sendRes(200, students)
       res.end(students);
//Add New student with unique Email
    } else if ( url =='/students' && method == 'POST'){
        let body = ''
        req.on('data',(chunk)=>{
            body += chunk;
        })
        req.on('end', ()=>{
        let students = JSON.parse(fs.readFileSync('student.json', 'utf-8'));

        let newStudent = JSON.parse(body);
        let emailExists = students.find(student => student.Email === newStudent.Email);

        if (!emailExists){
        students.push(newStudent);
        fs.writeFileSync('student.json', JSON.stringify(students))
        res.end (JSON.stringify({ message : "student added sucessfully", students}) )
        }else {
        res.end (JSON.stringify({ message : "student already exist"}) )
    }
   });
//Update student
    }else if (url.startsWith('/students/') && method == 'PUT') {
        let body = ''
        req.on('data',(chunk)=>{
            body += chunk;
        })
        req.on('end',()=>{
            const id = +url.split('/')[2];
            let students = JSON.parse(fs.readFileSync('student.json', 'utf-8'));
            let newStudent = JSON.parse(body);
            let studentIndex = students.findIndex(student => student.Id == id);
            if (studentIndex !== -1){
            students[studentIndex] = {...students[studentIndex], ...newStudent };
            fs.writeFileSync('student.json', JSON.stringify(students));
            res.end(JSON.stringify({message: "student Updated Sucessfully", students}))
            }else {
                res.end(JSON.stringify({message: "wrong data"}))
            }
        })
    //Delete Students
    }else if (url.startsWith('/students/') && method == 'DELETE') {
        const id = +url.split('/')[2];
        let students = JSON.parse(fs.readFileSync('student.json', 'utf-8'))
        let studentIndex = students.findIndex(student => student.Id == id)
        if (studentIndex !== -1) {
        students.splice(studentIndex , 1)
        fs.writeFileSync('student.json', JSON.stringify(students));
        res.end(JSON.stringify({message: "student Deleted Sucessfully", students}))
        }else{
            res.end(JSON.stringify({message: "student doesnot exisist"})) 
        }
// student search by id
    }else if (url.startsWith('/students/') && method == 'GET'){
        const id = +url.split('/')[2];
        let students = JSON.parse(fs.readFileSync('student.json', 'utf-8'));
        let student = students.find(student => student.Id == id);
        if (student){
            res.end(JSON.stringify(student))
        }else {
            res.end(JSON.stringify({message: "student not found"}))
        }
    }



/// courses CRUD:
//GET all courses
    else if (url == '/courses' && method == 'GET'){
        let courses = fs.readFileSync('courses.json', 'utf-8');
        res.end(courses);
//Delete specific course
    }else if (url.startsWith('/courses/') && method == 'DELETE'){
        let courses = JSON.parse(fs.readFileSync('courses.json', 'utf-8'));
        let id = +url.split('/')[2];
        let courseIndex = courses.findIndex(course => course.Id == id)
        if (courseIndex !== -1) {
        courses.splice(courseIndex, 1)
        fs.writeFileSync('courses.json', JSON.stringify(courses));
        res.end(JSON.stringify({message: "course Deleted Sucessfully", courses}))
        }else {
            res.end(JSON.stringify({message: "course doesnot exisist"}))
        }
// updated course
    }else if (url.startsWith('/courses/') && method == 'PUT'){
        let body ='';
        req.on('data',(chunk)=>{
            body += chunk;
        })
        req.on('end', ()=>{
            let courses = JSON.parse(fs.readFileSync('courses.json', 'utf-8'));
            let id = +url.split('/')[2];
            let updatedCourse = JSON.parse(body);
            let courseIndex = courses.findIndex(course => course.Id == id);
            if (courseIndex !== -1){
                courses[courseIndex]= {...courses[courseIndex], ...updatedCourse }
                fs.writeFileSync('courses.json', JSON.stringify(courses));
                res.end(JSON.stringify({message: "course updated Sucessfully", courses}));
            }else{
                res.end(JSON.stringify({message: "course doesnot exisist"}));
            }
        })
// add new course
    }else if (url== '/courses' && method == 'POST'){
        let body ='';
        req.on('data',(chunk)=>{
            body += chunk;
        })
        req.on('end', ()=>{
            let courses = JSON.parse(fs.readFileSync('courses.json', 'utf-8'));
            let addedCourse = JSON.parse(body);
            courses.push(addedCourse);
            fs.writeFileSync('courses.json', JSON.stringify(courses));
            res.end(JSON.stringify({message:"course added sucessfully", courses}))
        }) 
// Search course id
    }else if (url.startsWith('/courses/') && method == 'GET'){
            const id = +url.split('/')[2];
            let courses = JSON.parse(fs.readFileSync('courses.json', 'utf-8'));
            let course = courses.find(course => course.Id == id);
            if (course){
                res.end(JSON.stringify(course))
            }else {
                res.end(JSON.stringify({message: "course not found"}))
            }
        }
    
    
/// departments CRUD:
//GET all departments
else if (url == '/depart' && method == 'GET'){
    let departments = fs.readFileSync('departments.json', 'utf-8');
    res.end(departments);
//Delete specific department
}else if (url.startsWith('/depart/') && method == 'DELETE'){
    let departments = JSON.parse(fs.readFileSync('departments.json', 'utf-8'));
    let id = +url.split('/')[2];
    let departIndex = departments.findIndex(course => course.Id == id)
    if (departIndex !== -1) {
        departments.splice(departIndex, 1)
    fs.writeFileSync('departments.json', JSON.stringify(departments));
    res.end(JSON.stringify({message: "department Deleted Sucessfully", departments}))
    }else {
        res.end(JSON.stringify({message: "department doesnot exisist"}))
    }
// updated department
}else if (url.startsWith('/depart/') && method == 'PUT'){
    let body ='';
    req.on('data',(chunk)=>{
        body += chunk;
    })
    req.on('end', ()=>{
        let departments = JSON.parse(fs.readFileSync('departments.json', 'utf-8'));
        let id = +url.split('/')[2];
        let updatedDepart = JSON.parse(body);
        let departIndex = departments.findIndex(course => course.Id == id);
        if (departIndex !== -1){
            departments[departIndex]= {...departments[departIndex], ...updatedDepart }
            fs.writeFileSync('departments.json', JSON.stringify(departments));
            res.end(JSON.stringify({message: "department updated Sucessfully", departments}));
        }else{
            res.end(JSON.stringify({message: "department doesnot exisist"}));
        }
    })
//add new department
}else if (url== '/depart' && method == 'POST'){
    let body ='';
    req.on('data',(chunk)=>{
        body += chunk;
    })
    req.on('end', ()=>{
        let departments = JSON.parse(fs.readFileSync('departments.json', 'utf-8'));
        let addedDepart = JSON.parse(body);
        departments.push(addedDepart);
        fs.writeFileSync('departments.json', JSON.stringify(departments));
        res.end(JSON.stringify({message:"department added sucessfully", departments}))
    }) 
// search by id:
}else if (url.startsWith('/depart/') && method== 'GET'){
    const id = +url.split('/')[2];
    let departs = JSON.parse(fs.readFileSync('departments.json', 'utf-8'));
    let depart = departs.find(depart=> depart.Id == id);
    if (depart){
        res.end(JSON.stringify(depart))
    }else {
        res.end(JSON.stringify({message: "depart not found"}))
    }
} 


    // Get all student data: 
    else if (url == '/studentsData' && method == 'GET'){
        let students = JSON.parse(fs.readFileSync('student.json', 'utf-8'))
        let courses = JSON.parse(fs.readFileSync('courses.json', 'utf-8'));
        let departments = JSON.parse(fs.readFileSync('departments.json', 'utf-8'));

        let studentdata = students.map(student=> {
        //    let elem = departments.find(depart =>{depart.Id === student.DepartmentId}) 
        //    let elem2 = courses.find(course =>{course.DepartmentId === student.DepartmentId}) 
            let elem = departments.find((depart) => {
            return depart.Id === student.DepartmentId;
            }); 
            let elem2 = courses.filter((course) => {
            return course.DepartmentId===student.DepartmentId;
            });
            return {
                ...student,
                departmentName: elem.Name,
                courseName:elem2.Name,
                courseContent: elem2.Content   
            }  
        })
        res.end(JSON.stringify(studentdata))

    }else {
        res.end (JSON.stringify({ message : "error in handling the route"}) )

    }
})

server.listen(3001, () => console.log('DB connected server is running ...'));