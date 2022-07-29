const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({

    name:{
        type:String,
        unique:true,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:'open'
    },
    issues:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Issue'
        }
    ]

},{
    timestamps:true
})

const Project=mongoose.model('Project',projectSchema);

module.exports=Project;