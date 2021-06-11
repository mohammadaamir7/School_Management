const classSchema = require('../../modal/classSchema')
const sectionSchema = require('../../modal/sectionSchema')
const studentSchema = require('../../modal/studentSchema')
const attendanceSchema = require('../../modal/attendanceSchema')
const gradeSchema = require('../../modal/gradeSchema')
const timetableSchema = require('../../modal/timeTableSchema')

module.exports.addClass = async (req, res) => {
    try{
        const classIns = await classSchema.findOne({title: req.body.title})

        if(classIns){
            return res.json({message: 'Class title already exists'})
        }else{
            const classobj = new classSchema()

            classobj.title = req.body.title
            classobj.description = req.body.description
            classobj.incharge = req.body.incharge

            await classobj.save()
                .then((data) => {
                    return res.json({
                        message: "class add successful",
                        success: "success",
                        data,
                        status: 200,
                    })
                })
                .catch((err) => {
                    return res.json({
                        message: "class add unsuccessful",
                        err,
                        status: 400,
                    })
                })
        }
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.addStudent = async (req, res) =>{
    try{

        const student = new studentSchema()

        student.name = req.body.name
        student.admin_no = req.body.admin_no
        student.phone = req.body.phone
        student.email = req.body.email
        student.studentClass = req.body.studentClass
        student.section = req.body.section
        student.roll_no = req.body.roll_no
        student.father_name = req.body.father_name
        student.father_num = req.body.father_num
        student.login_email = req.body.login_email

        await student.save()
                .then((data) => {
                    return res.json({
                        message: "student add successful",
                        success: "success",
                        data,
                        status: 200,
                    })
                })
                .catch((err) => {
                    return res.json({
                        message: "student add unsuccessful",
                        err,
                        status: 400,
                    })
                })

    }catch(err){
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.deleteStudent = async (req, res) => {
    try{
        
        await studentSchema.findByIdAndDelete(req.params.id)
            .then(() => {
                return res.json({
                    message: "section delete successful",
                    success: "success",
                    status: 200,
                })
            })
            .catch((err) => {
                return res.json({
                    message: "section delete unsuccessful",
                    status: 400,
                    error: "error",
                    err,
                })
            })

    } catch(error){
        return res.json({ message: "server crashed", error });
    }
}


module.exports.addSection = async (req, res) => {
    try{
        
        const section = new sectionSchema()

        section.title = req.body.title
        section.description = req.body.description
        section.teacher = req.body.teacher
        section.class_id = req.body.class_id
        section.classTitle = req.body.classTitle

        await section.save()
            .then((data) => {
                return res.json({
                    message: "section add successful",
                    success: "success",
                    data,
                    status: 200,
                })
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getClasses = async (req, res) => {
    try{
        
        await classSchema.find()
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}


module.exports.getSections = async (req, res) => {
    try{
        
        await sectionSchema.find()
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}


module.exports.singleClass = async (req, res) => {
    try{
        
        await classSchema.findOne({_id: req.params.id})
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.singleSection = async (req, res) => {
    try{
        
        await sectionSchema.findOne({_id: req.params.id})
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}


module.exports.classData = async (req, res) => {
    try{
        
        const classData = await classSchema.find()
        const sections = await sectionSchema.find()
        const students = await studentSchema.find()
        var collectedData = []
        var sectionCount = 0
        var studentCount = 0

        classData.forEach(classIns => {
            sectionCount = 0
            studentCount = 0

            sections.forEach(section => {
                if(classIns.title === section.classTitle){
                    sectionCount++
                }
            })

            students.forEach(student => {
                if(classIns.title === student.studentClass){
                    studentCount++
                }
            })

            var dataObj = {
                id: classIns._id,
                title: classIns.title,
                sectionCount,
                studentCount,
                incharge: classIns.incharge
            }

            collectedData.push(dataObj)
        });

        return res.json(collectedData)
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.sectionData = async (req, res) => {
    try{
        
        const classData = await classSchema.findOne({ _id: req.params.id })
        const sections = await sectionSchema.find()
        const students = await studentSchema.find()
        var collectedData = []
        var sectionData = []
        var studentCount = 0

        sections.forEach(section => {
            
            if(classData.title === section.classTitle){
                sectionData.push(section)
            }
            
        })

        

        sectionData.forEach(classIns => {
            studentCount = 0

            students.forEach(student => {
                if(classIns.title === student.section){
                    studentCount++
                }
            })

            var dataObj = {
                _id: classIns._id,
                title: classIns.title,
                studentCount,
                teacher: classIns.teacher,
                class_id: classIns.class_id
            }

            collectedData.push(dataObj)
        });
        return res.json(collectedData)
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.updateSection = async (req, res) => {
    try{
        
        const presentClass = await classSchema.findOne({title: req.body.currentClass})
        sectionSchema.findById(req.params.id)
            .then(section => {
                section.title = req.body.title
                section.description = req.body.description
                section.teacher = req.body.teacher
                section.class_id = presentClass._id
                section.classTitle = req.body.currentClass

                section.save()
                    .then((data) => {
                        return res.json({
                            message: "section add successful",
                            success: "success",
                            data,
                            status: 200,
                        })
                    })
                    .catch((err) => {
                        return res.json({
                            message: "section add unsuccessful",
                            err,
                            status: 400,
                        })
                    })
            })

        
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.deleteSection = async (req, res) => {
    try{
        const section = await sectionSchema.findOne({_id: req.params.id});
        await sectionSchema.findByIdAndDelete(req.params.id)
            .then(() => {
                return res.json({
                    message: "section delete successful",
                    success: "success",
                    status: 200,
                })
            })
            .catch((err) => {
                return res.json({
                    message: "section delete unsuccessful",
                    status: 400,
                    error: "error",
                    err,
                })
            })

        await studentSchema.deleteMany({section: section.title})
        .then(() => {
            return res.json({
                message: "section delete successful",
                success: "success",
                status: 200,
            })
        })
        .catch((err) => {
            return res.json({
                message: "section delete unsuccessful",
                status: 400,
                error: "error",
                err,
            })
        })    
    } catch(error){
        return res.json({ message: "server crashed", error });
    }
}

module.exports.changeSections = async (req, res) => {
    try{
        
        await sectionSchema.find({classTitle: req.params.title})
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getStudents = async (req, res) => {
    try{
        
        await studentSchema.find({ section: req.params.title })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}


module.exports.submitAttendance = async (req, res) => {
    try{

       const attendanceIns = new attendanceSchema()

       attendanceIns.date = req.body.date 
       attendanceIns.presentStudents = req.body.presentStudents
       attendanceIns.absentStudents = req.body.absentStudents
       attendanceIns.section = req.body.section
       attendanceIns.Sclass = req.body.Sclass

       console.log(JSON.stringify(attendanceIns))


       await attendanceIns.save()
        .then((data) => {
            return res.json({
                message: "section add successful",
                success: "success",
                data,
                status: 200,
            })
        })
        .catch((err) => {
            return res.json({
                message: "section add unsuccessful",
                err,
                status: 400,
            })
        })
        
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.editAttendance = async (req, res) => {
    try{
        
        const attendanceIns = await attendanceSchema.find({section : req.body.section, Sclass : req.body.Sclass})
       attendanceIns.forEach(element => {
           if(new Date(req.params.date).getFullYear() === new Date(element.date).getFullYear() && new Date(req.params.date).getMonth() === new Date(element.date).getMonth() && new Date(req.params.date).getDate() === new Date(element.date).getDate()){
               element.presentStudents = req.body.presentStudents
               element.absentStudents = req.body.absentStudents
                
               element.save()
               .then((data) => {
                        return res.json({
                            message: "section add successful",
                            success: "success",
                            data,
                            status: 200,
                        })
                    })
                    .catch((err) => {
                        return res.json({
                            message: "section add unsuccessful",
                            err,
                            status: 400,
                        })
                    })
           }
       });
        
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}


module.exports.viewAttendance = async (req, res) => {
    try{
        
        await attendanceSchema.find({ section: req.params.title_s, Sclass: req.params.title_c }).sort({date: 'desc'})
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.singleStudent = async (req, res) => {
    try{
        
        await studentSchema.findOne({_id: req.params.id})
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.addStudentGrade = async (req, res) => {
    try{

        const grade = new gradeSchema()

        grade.title = req.body.title.toLowerCase()
        grade.totalMarks = req.body.totalMarks
        grade.obtainedMarks = req.body.obtainedMarks
        grade.student_id = req.body.student_id
        grade.student_admin_no = req.body.student_admin_no
        grade.student_name = req.body.student_name

        var percentage = (req.body.obtainedMarks / req.body.totalMarks) * 100
        

        var testGrade = ''

        if(percentage < 40){
            testGrade = 'F'
        }

        if(percentage >= 40 && percentage <= 50){
            testGrade = 'E'
        }
        
        if(percentage >= 51 && percentage <= 60){
            testGrade = 'D'
        }

        if(percentage >= 61 && percentage <= 70){
            testGrade = 'C'
        }

        if(percentage >= 71 && percentage <= 80){
            testGrade = 'B'
        }

        if(percentage >= 81){
            testGrade = 'A'
        }

        grade.percentage = percentage
        grade.testGrade = testGrade
        
        await grade.save()
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getStudentGrades = async (req, res) => {
    try{
        
        await gradeSchema.find({ student_id: req.params.id })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getGradestitles = async (req, res) => {
    try{
        
        var grades = await gradeSchema.find({ student_id: req.params.id })
        
        var titles = []
        grades.forEach(element => {
            titles.push(element.title)
        })

        return res.json(titles)
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getStudentGrades = async (req, res) => {
    try{
        
        await gradeSchema.find({ student_admin_no: req.params.id })
            .then((data) => {
                
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
        

        return res.json(titles)
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.singleStudentByRoll = async (req, res) => {
    try{
        
        await studentSchema.findOne({admin_no: req.params.id})
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.updateGrade = async (req, res) => {
    try{
        
        //const presentGrade = await gradeSchema.findById(req.params.id)
        gradeSchema.findById(req.params.id)
            .then(grade => {
                grade.title = req.body.title
                grade.totalMarks = req.body.totalMarks
                grade.obtainedMarks = req.body.obtainedMarks
                
                var percentage = (req.body.obtainedMarks / req.body.totalMarks) * 100
        

                var testGrade = ''

                if(percentage < 40){
                    testGrade = 'F'
                }

                if(percentage >= 40 && percentage <= 50){
                    testGrade = 'E'
                }
                
                if(percentage >= 51 && percentage <= 60){
                    testGrade = 'D'
                }

                if(percentage >= 61 && percentage <= 70){
                    testGrade = 'C'
                }

                if(percentage >= 71 && percentage <= 80){
                    testGrade = 'B'
                }

                if(percentage >= 81){
                    testGrade = 'A'
                }

                grade.percentage = percentage
                grade.testGrade = testGrade

                grade.save()
                    .then((data) => {
                        return res.json({
                            message: "section add successful",
                            success: "success",
                            data,
                            status: 200,
                        })
                    })
                    .catch((err) => {
                        return res.json({
                            message: "section add unsuccessful",
                            err,
                            status: 400,
                        })
                    })
            })

        
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.deleteGrade = async (req, res) => {
    try{
        
        await gradeSchema.findByIdAndDelete(req.params.id)
            .then(() => {
                return res.json({
                    message: "section delete successful",
                    success: "success",
                    status: 200,
                })
            })
            .catch((err) => {
                return res.json({
                    message: "section delete unsuccessful",
                    status: 400,
                    error: "error",
                    err,
                })
            })

    } catch(error){
        return res.json({ message: "server crashed", error });
    }
}

module.exports.singleGrade = async (req, res) => {
    try{
        
        await gradeSchema.findOne({_id: req.params.id})
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.addLecture = async (req, res) => {
    try{
        
        const lecture = new timetableSchema()

        lecture.title = req.body.title
        lecture.day = req.body.day
        lecture.teacherName = req.body.teacherName
        lecture.lecStart = req.body.lecStart
        lecture.lecEnd = req.body.lecEnd

        await lecture.save()
            .then((data) => {
                return res.json({
                    message: "lecture add successful",
                    success: "success",
                    data,
                    status: 200,
                })
            })
            .catch((err) => {
                return res.json({
                    message: "lecture add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getTimetable = async (req, res) => {
    try{
        
        await timetableSchema.find()
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.updateTimetable = async (req, res) => {
    try{
        
        //const presentClass = await classSchema.findOne({title: req.body.currentClass})
        timetableSchema.findById(req.params.id)
            .then(timetable => {
                timetable.title = req.body.title
                timetable.day = req.body.day
                timetable.teacherName = req.body.teacherName
                timetable.lecStart = req.body.lecStart
                timetable.lecEnd = req.body.lecEnd

                timetable.save()
                    .then((data) => {
                        return res.json({
                            message: "section add successful",
                            success: "success",
                            data,
                            status: 200,
                        })
                    })
                    .catch((err) => {
                        return res.json({
                            message: "section add unsuccessful",
                            err,
                            status: 400,
                        })
                    })
            })

        
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.deleteTimetable = async (req, res) => {
    try{
        
        await timetableSchema.findByIdAndDelete(req.params.id)
            .then(() => {
                return res.json({
                    message: "section delete successful",
                    success: "success",
                    status: 200,
                })
            })
            .catch((err) => {
                return res.json({
                    message: "section delete unsuccessful",
                    status: 400,
                    error: "error",
                    err,
                })
            })
    
    } catch(error){
        return res.json({ message: "server crashed", error });
    }
}

module.exports.singleTimetable = async (req, res) => {
    try{
        
        await timetableSchema.findOne({_id: req.params.id})
            .then((data) => {
                console.log(data)
                return res.json(data)
            })
            .catch((err) => {
                return res.json({
                    message: "section add unsuccessful",
                    err,
                    status: 400,
                })
            })
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getDayAttendance = async (req, res) => {
    try{
        
        var att = await attendanceSchema.find({ section: req.params.title_s, Sclass: req.params.title_c })

        att.forEach((element) => {
            if(new Date(element.date).getFullYear() === new Date(req.params.id).getFullYear() && new Date(element.date).getMonth() === new Date(req.params.id).getMonth() && new Date(element.date).getDate() === new Date(req.params.id).getDate()){
                //console.log(element)
                return res.json(element)
            }
        })
        return res.json({message: 'server crashed', err}) 
    
    }catch(err) { 
        return res.json({message: 'server crashed', err}) 
    }
}

module.exports.getDataCount = async (req, res) => {
    try{
        var classes = 0
        var sections = 0
        var students = 0
        var prs_count = 0
        var abs_count = 0
        var dateT = ''
        var yr = new Date().getFullYear()
        var mn = new Date().getMonth() + 1
        var dy = new Date().getDate()
        dateT = yr + '-' + mn + '-' + dy

        classes = await classSchema.countDocuments()
        sections = await sectionSchema.countDocuments()
        students = await studentSchema.countDocuments()
        var std_data = await attendanceSchema.find({date: dateT})

        std_data.forEach(el => {
            prs_count += el.presentStudents.length
            abs_count += el.absentStudents.length
        })

        return res.json({
            classes,
            sections,
            students,
            prs_count,
            abs_count,
        })
    
    }catch(err) { 
        console.log('err')
        return res.json({message: 'server crashed', err}) 
    }
}