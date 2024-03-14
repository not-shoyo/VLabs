export default {
  watch: ["../JSON_Data/SelfEvaluationData.json"],
  load(watchedFiles) {
    return watchedFiles.map((file) => {
      const fileContent = require(file);
      // console.log(fileContent);
      return fileContent;
    });
  },
};
