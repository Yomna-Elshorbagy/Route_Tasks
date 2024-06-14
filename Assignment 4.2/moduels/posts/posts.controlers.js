import { dbConnection } from "../../database/coonection.js"


const conn = dbConnection()


const addpost = (req, res)=>{
    conn.query(`insert into posts set ?`, req.body);
    res.status(200).json({message:'post added sucessfully..'})
}
const getAllPosts = (req, res)=>{
    conn.execute(`select users.id,users.name,posts.tittle, posts.description, posts.id as post_Id from posts join users on users.id=posts.user_id`, (err,data)=>{
        if(err) return res.status(404).json({message:'query error', ERRor: err})
        res.status(200).json({message:'post added sucessfully..', allPosts: data});
    });
};
const getsinglePosts = (req, res)=>{
    conn.execute(`select users.id,users.name,posts.tittle, posts.description, posts.id as post_Id from posts join users on users.id = posts.user_id where posts.id=${req.params.id}`, (err,data)=>{
        if(err) return res.status(404).json({message:'query error', ERRor: err})
        res.status(200).json({message:'post added sucessfully..', post: data});
    });
}
const getUserPosts = (req, res)=>{
    conn.execute(`select users.id,users.name,posts.tittle, posts.description, posts.id as post_Id from posts join users on users.id = posts.user_id where users.id=${req.params.id}`, (err,data)=>{
        if(err) return res.status(404).json({message:'query error', ERRor: err})
        res.status(200).json({message:'post added sucessfully..', userPosts: data});
    });
}

const updateUser = (req,res)=>{
    conn.query(`update posts set ? where id = ?`,[req.body, req.params.id], (err,data)=>{
        res.status(200).json({message:'post updated sucessfully..', postUpdated: data});
    });
};

const deleteUser = (req,res)=>{
    conn.execute('SELECT * FROM posts WHERE id = ?', [req.params.id], (err,data)=>{
        if(err) return res.status(404).json({message:'query error', ERRor: err})
    if (data.length != 0){
        conn.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err, data) => {
            res.status(200).json({message:'post deleted sucessfully..', postDeleted: data});
    })
 } else{
        res.status(200).json({message:'post already deleted'});
    }

})
}

export {
    addpost,
    getAllPosts,
    getsinglePosts,
    getUserPosts,
    updateUser,
    deleteUser
}