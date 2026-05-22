const workModel = require("../models/workModel");
const cloudinary=require("cloudinary").v2;

exports.createWork = async (req, res) => {
    const { 
        title, 
        url, 
        category, 
        description, 
        technologies, 
        githubUrl, 
        status, 
        duration, 
        teamSize 
    } = req.body;
    
    let uploadedImages = [];
    
    try {
        // Validate required fields
        const requiredFields = ['title', 'description', 'url', 'category'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).send({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Check for images
        const images = req.files?.images || req.files?.image;
        if (!images || (Array.isArray(images) && images.length === 0)) {
            return res.status(400).send({
                success: false,
                message: "Please upload at least one image"
            });
        }

        // Convert to array if single file
        const imageArray = Array.isArray(images) ? images : [images];
        
        // Validate file types
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const invalidFiles = imageArray.filter(img => !allowedTypes.includes(img.mimetype));
        
        if (invalidFiles.length > 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed"
            });
        }

        // Upload images to Cloudinary with progress tracking
        const uploadPromises = imageArray.map(async (image, index) => {
            try {
                const result = await cloudinary.uploader.upload(image.path, {
                    resource_type: 'image',
                    folder: 'portfolio/works',
                    transformation: [
                        { quality: 'auto:good' },
                        { fetch_format: 'auto' },
                        { crop: 'limit', width: 2000, height: 2000 }
                    ],
                    // Optional: Add image metadata
                    context: `alt=${encodeURIComponent(title)}|caption=Image ${index + 1}`
                });
                
                return {
                    url: result.secure_url,
                    publicId: result.public_id,
                    alt: `${title} - Image ${index + 1}`,
                    caption: '',
                    width: result.width,
                    height: result.height,
                    format: result.format
                };
            } catch (uploadError) {
                console.error(`Error uploading image ${index + 1}:`, uploadError);
                throw new Error(`Failed to upload image ${index + 1}`);
            }
        });
        
        uploadedImages = await Promise.all(uploadPromises);

        // Parse technologies
        let parsedTechnologies = [];
        if (technologies) {
            if (typeof technologies === 'string') {
                try {
                    parsedTechnologies = JSON.parse(technologies);
                } catch {
                    // If JSON parsing fails, split by comma
                    parsedTechnologies = technologies.split(',').map(t => t.trim()).filter(t => t);
                }
            } else if (Array.isArray(technologies)) {
                parsedTechnologies = technologies;
            }
        }

        // Parse teamSize
        const parsedTeamSize = teamSize ? parseInt(teamSize) : 1;
        if (isNaN(parsedTeamSize)) {
            return res.status(400).send({
                success: false,
                message: "Team size must be a number"
            });
        }

        // Create work entry
        const workData = {
            title: title.trim(),
            description: description.trim(),
            images: uploadedImages,
            url: url.trim(),
            category: category.trim().toLowerCase(),
            technologies: parsedTechnologies,
            githubUrl: githubUrl?.trim() || '',
            status: status || 'completed',
            duration: duration?.trim() || '',
            teamSize: parsedTeamSize
        };

        // Validate category
        const validCategories = ['frontend', 'backend', 'fullstack', 'mobile', 'devops', 'database', 'ecommerce', 'portfolio', 'dashboard'];
        if (!validCategories.includes(workData.category)) {
            return res.status(400).send({
                success: false,
                message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
            });
        }

        // Validate status
        const validStatuses = ['completed', 'in-progress', 'planned'];
        if (!validStatuses.includes(workData.status)) {
            return res.status(400).send({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        const createdWork = await workModel.create(workData);

        if (!createdWork) {
            throw new Error("Failed to create work entry in database");
        }

        return res.status(201).send({
            success: true,
            message: "Work added successfully",
            work: createdWork
        });
        
    } catch (error) {
        console.error('Error creating work:', error);
        
        // Clean up uploaded images if database insertion fails
        if (uploadedImages.length > 0) {
            const deletionPromises = uploadedImages.map(async (img) => {
                if (img.publicId) {
                    try {
                        await cloudinary.uploader.destroy(img.publicId);
                    } catch (deleteError) {
                        console.error('Error deleting image:', deleteError);
                    }
                }
            });
            await Promise.all(deletionPromises);
        }
        
        return res.status(500).send({
            success: false,
            message: "Error creating work",
            error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
        });
    }
};
exports.getAllWork = async (req, res) => {

    try{
       const allWork=await workModel.find({});

       if(!allWork){
        return res.status(400).send({
            success:false,
            message:"no work avali!"
        })
       }

       return res.status(200).send({
        success:true,
        allWork
       })
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error creating product");
    }
};
exports.getWorkById=async(req,res)=>{
    try{
        const {id}=req.params;

        const work=await workModel.findById({_id:id});

        if(!work){
            return res.status(401).json({
                success:false,
                message:"No work for this id"
            })
        }

        return res.status(200).json({
            success:true,
            work
        })
    }catch(e){
        console.log(e.message);
    }
}
exports.removeWork=async(req,res)=>{
    try{
        const {workID}=req.params;

        const deletedWork=await workModel.findByIdAndDelete(workID);

        if(deletedWork){
            return res.status(200).send({
                success:true,
                message:"Work Deleted"
            })
        }else{
            return res.status(400).send({
                success:false,
                message:"There is no work for this id."
            })
        }
    }catch(error){
        console.log(error.message)
    }
}