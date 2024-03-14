export default {
  watch: ["../../JSON_Data/QuizData.json"],
  load(watchedFiles) {
    return watchedFiles.map((file) => {
      const fileContent = require(file);
      // console.log(fileContent);
      return fileContent;
    });
  },
};
