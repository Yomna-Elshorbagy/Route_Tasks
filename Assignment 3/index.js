const { json } = require('body-parser');
const express = require('express'); //function & object 
const fs = require('fs');
const statusCode = require('http-status-codes')
const server = express(); //call function
const port = 4000;

server.use(express.json()); //parsing body

let members = JSON.parse(fs.readFileSync('gymMembers.json', 'utf-8'));
let trainers = JSON.parse(fs.readFileSync('trainer.json', 'utf-8'));


//Get revenues:
  server.get('/revenues', (req, res)=>{
    const totalRevenue = members.reduce((sum , num)=>{
        return sum + num.Membership.cost;
    }, 0);
    res.json({ totalRevenue });
  });
//with for :
server.get('/allRevenues',(req,res)=>{
    let sum =0
    for(let i = 0; i< members.length; i++){
        sum += members[i].Membership.cost
    }
    res.status(200).json({"total Revenues = ": sum})
})

// Get revenues for specific trainer:        
server.get('/revenues/:id', (req, res)=>{
    const id = +req.params.id
    const totalRevenue = members.reduce((sum , num)=>{
        if (id === num.TrainerId){
        return sum + (num.Membership ? num.Membership.cost : 0);
        }
        return sum;
    }, 0) 
    res.json({ totalRevenue });
  });
// with for :
server.get('/getRevenues/:id', (req,res)=>{
    let sum=0;
    let id = +req.params.id;
    for(let i=0 ; i< members.length; i++){ 
        if(id === members[i].TrainerId){
            sum += members[i].Membership.cost
        }     
    }
    res.status(200).json({"total Revenues = ": sum})
})
/////////////////////////////////////////////////////////////////////////////////////////////////

// get all members:
server.get('/members', (req, res) =>
 res.status(200).json({message:"all members are: ", members})
);

//Get specific member:
server.get('/member/:id', (req, res, next)=>{
    let memberId = req.params.id;
    let member = members.find(member => member.id === +memberId);
    if (member){
        res.send({member});
    }else{
        res.status(404).json({message:'member id doesnot exist'})  
    }
});

//Get spacific member with trainer:
server.get('/member2/:id', (req, res, next)=>{
    let memberId = +req.params.id;
    let member = members.find(member => member.id === memberId);
    if (member){
        let memberTrainer = trainers.find(trainer => trainer.id === member.TrainerId);
        console.log(memberTrainer);
        console.log("Member: ", member);
        console.log("Trainers: ", trainers);
        console.log("Member Trainer ID: ", member.TrainerId);
        console.log("Member Trainer: ", memberTrainer);
        if (memberTrainer){
            res.status(200).json({member, memberTrainer});
        }else{
            res.status(404).json({message:'Donet have Trainer',member });
        }
    }else{
        res.status(404).json({message:'member id doesnot exist'})  
    }
});
//Get all members with trainer:
server.get('/member3', (req,res)=>{
    let memberId = +req.params.id;
    let {id} = +req.params;

    let allMembers = members.map(member =>{
        let memberTrainer = trainers.find(trainer => trainer.id === member.TrainerId);
        return {member, memberTrainer}
    });
    res.json(allMembers);
})
// Get member with membership expiration:
server.get('/memberExp/:id', (req, res)=>{
    let {id} = +req.params;
    let member = members.find(member => member.id === id)
    let date = new Date();
    let membership = new Date(member.Membership.to);
    console.log(membership);
    console.log(date);

    if (membership < date ){
        res.json({message: ' Membership is expired ..'});
    }else {
        res.json({message: ' member is allowed ..', member});
    }
})

//add members with uniqe id:
server.post('/addmember', (req,res)=>{
    let memberId = members.length + 1; 
    req.body.id = memberId;
    members.push(req.body);
    fs.writeFileSync('gymMembers.json', JSON.stringify(members));
    res.status(201).json({message:'member added sucessfully', members});
})
// using find / or some:
server.post('/addmember2', (req,res)=>{
    const {id} = req.body;
    if (members.find(member => member.id === id )){
        return res.json({message:'id already exisist'});
    }else{
    members.push(req.body);
    fs.writeFileSync('gymMembers.json', JSON.stringify(members));
    res.status(201).json({message:'member added sucessfully', members});
}})

// Delete Member:     
server.delete('/member/:id',(req, res)=>{
    let index = members.findIndex((member)=>{
        return member.id === +req.params.id;
    });
    if (index !== -1){
        members.splice(index, 1);
        fs.writeFileSync('gymMembers.json', JSON.stringify(members));
        res.status(200).json({message:' member deleted sucessfully', members})
    }else{
        res.status(200).json({message:' member index incorrect'})
    }
})

// update member :   
server.put('/member/:id', (req, res,next)=>{
    let {id} = req.params;
    let memberIndex = members.findIndex(member => member.id === +id)
    console.log(members.map(member => member.id));
    if (memberIndex !== -1){
        members[memberIndex] = {...members[memberIndex], ...req.body};
        // members[memberIndex].Name = req.body.Name;
        // members[memberIndex].TrainerId = req.body.TrainerId;
        // members[memberIndex].Membership = req.body.Membership;
        fs.writeFileSync('gymMembers.json', JSON.stringify(members));

        res.json({message:'updated sucessfully', members})
    }else{
        res.json({message:'Error No index ...'})
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// get all trainers
server.get('/trainers', (req, res) =>
 res.status(200).json({message:"all trainers are: ", trainers})
);
// Get spacific trainer:
server.get('/trainer/:id', (req, res , next)=>{
    let trainerId = req.params.id;
    let traier = trainers.find(train => train.id === +trainerId);
    if (traier){
     res.json({traier})
    }else{
     res.json({message:'incorrect id ..'})
    }   
 });
// Get specific triner with trainer members:
server.get('/trainers/:id', (req, res , next)=>{
    let trainerId = req.params.id;
    let traier = trainers.find(train => train.id === +trainerId);
    if (traier){
        let trainerMembers = members.filter(member => member.TrainerId === +trainerId )
     res.json({traier, trainerMembers})
    }else{
     res.json({message:'incorrect id ..'})
    }   
 });
// Get all trainers with members 
server.get('/traineer', (req, res, next)=>{
    let tranersMembers = trainers.map(trainer =>{
        let allMembers = members.find(member => member.TrainerId == trainer.id );
        return ({trainer, allMembers})

    });
    res.json({tranersMembers})
})

//add new trainer with unique id :
server.post('/addTrainer', (req,res)=>{
    req.body.id = trainers.length + 1;
    trainers.push(req.body);
    fs.writeFileSync('trainer.json', JSON.stringify(trainers));
    res.status(201).json({message:'trainer added sucessfully', trainers});
})

// Delete Trainer:
server.delete('/trainer/:id', (req,res)=>{
    let trainId = req.params.id;
    let index = trainers.findIndex(trainer => trainer.id === +trainId);

    if (index !== -1 ){
        trainers.splice(index, 1);
        res.status(200).json({message:'traier deleted sucessfully', trainers})
    }else{
        res.status(200).json({message:'traier doesnot exist'})
    }
})

// update trainer :
server.put('/trainer/:id', (req, res,next)=>{
    let {id} = req.params;
    let trainerIndex = trainers.findIndex(member =>{
        return member.id === +id
    });
    if (trainerIndex !== -1){
        trainers[trainerIndex] = {...trainers[trainerIndex], ...req.body};
        fs.writeFileSync('trainer.json', JSON.stringify(trainers));
        res.json({message:'updated sucessfully', trainers})
    }else{
        res.json({message:'Error No index ...'})
    }
})
 
/////////////////////////////////////////////////////////////////////////////////////////////////////
server.all('*', (req, res)=>{
    res.json({message: 'Route is not exisist'});
})

server.listen(port, () => console.log(`server is running on port : ${port}!`))