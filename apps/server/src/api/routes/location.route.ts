// import { Router } from "express";
// import { coWriterController } from "../controllers";
// import { validateTag } from "../validation";
// import upload from "../../lib/multer";



// const router = Router();

// router.post("/" , coWriterController.getLocations )
// router.get("/:fileId/:locationId",coWriterController.getLocationById)
// // router.post("/:fileId/:locationId" , coWriterController.getLocations )
// router.post("/save",upload.single('image'),coWriterController.saveLocation)
// router.post("/smart-type/save",coWriterController.saveLocationBySmartType)


// router.get("/smart-type/get/:fileId",coWriterController.getLocationBySmartType)
// router.get("/smart-type/subLocation/get/:fileId",coWriterController.getAllSubLocations)


// router.post("/upload",upload.single('file'),coWriterController.saveImage)
// router.post("/update/:id",upload.single('image'),coWriterController.updateLocationInStoryworld)
// router.delete("/delete/:locationId/:fileId",coWriterController.deleteLocation)




// export default router;
import { Router } from "express";
import { coWriterController } from "../controllers";
import { validateTag } from "../validation";
import upload from "../../lib/multer";



const router = Router();

router.post("/" , coWriterController.getLocations )
router.get("/:fileId/:locationId",coWriterController.getLocationById)
// router.post("/:fileId/:locationId" , coWriterController.getLocations )
router.post("/save", upload.array('images'), coWriterController.saveLocation);
router.post("/smart-type/save",coWriterController.saveLocationBySmartType)


router.get("/smart-type/get/:fileId",coWriterController.getLocationBySmartType)
router.get("/smart-type/subLocation/get/:fileId",coWriterController.getAllSubLocations)


router.post("/upload",upload.single('file'),coWriterController.saveImage)
router.post("/update/:id",upload.array('images'),coWriterController.updateLocation)
router.put("/delete/location-images/:locationId", coWriterController.deleteLocationImage);

router.delete("/delete/:locationId/:fileId",coWriterController.deleteLocation)

//SubLocation
router.post("/subLocation/add/:locationId",upload.array('images'), coWriterController.addSubLocation);
router.put("/subLocation/update/:locationId/:subLocationId", upload.array('images'), coWriterController.updateSubLocation);
router.put("/subLocation/delete/images/:locationId/:subLocationId", coWriterController.deleteSubLocationImage);

router.delete("/subLocation/delete/:locationId/:subLocationId", coWriterController.deleteSubLocation);

export default router;
