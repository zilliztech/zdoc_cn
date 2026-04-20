const fs = require("fs");
const { exec } = require("child_process");
const {
	nginxConfigPath,
	validateChangedFiles,
	getNginxRedirects,
	getDeletedSlugs,
} = require("./common");

console.info(`***** Running pre-check.js *****`);

fs.readFile(nginxConfigPath, "utf8", (err, fileContents) => {
	if (err) {
		console.error("Error reading nginx.conf:", err);
		return;
	}

	const redirects = getNginxRedirects(fileContents);

	const GIT_COMMAND_GET_CHANGED_FILES = `git diff --cached`;
	exec(GIT_COMMAND_GET_CHANGED_FILES, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}
		const deletedSlugs = getDeletedSlugs(stdout, true);
		if (deletedSlugs.length > 0) {
			validateChangedFiles(deletedSlugs, redirects);
		} else {
			console.log("\x1b[90m%s\x1b[0m", `No deleted slugs to check`);
		}
		console.info(`***** 🎉 pre-check.js completed successfully *****\n`);
	});
});
