import joi from "joi";
var youtubeLinkRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
export var recommendationSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().required().pattern(youtubeLinkRegex)
});
