const fs = require("fs");
const redirectRegex = /location\s+[=~]\s+(.+?)\s+{[^}]*return\s+301\s+(.+?);/gm;
const locationRegex = /location\s*(=|~)?/;
const nginxConfigPath = 'default.conf';
const IGNORE_SLUG = "\\s*(.*)/gm;";

/**
 * Gets all slugs from all markdown files in specified directories
 * @param {string[]} directories - Array of directory paths to search
 * @returns {Object} Object mapping directory names to Sets of slugs
 */
const getAllSlugsInDocs = (directories = ['docs', 'versioned_docs', 'docs-agents', 'onpremise/docs']) => {
	const slugsByDir = {};

	directories.forEach(docsPath => {
		const slugs = new Set();
		slugsByDir[docsPath] = slugs;

		// Recursively find all .md files
		const findMdFiles = (dir) => {
			const files = fs.readdirSync(dir, { withFileTypes: true });

			files.forEach(file => {
				const fullPath = `${dir}/${file.name}`;

				if (file.isDirectory()) {
					findMdFiles(fullPath);
				} else if (file.isFile() && file.name.endsWith('.md')) {
					try {
						const content = fs.readFileSync(fullPath, 'utf8');
						const slugMatch = content.match(/^slug:\s*(.*)$/m);
						if (slugMatch) {
							slugs.add(slugMatch[1].trim());
						}
					} catch (error) {
						// Skip files that can't be read
						console.warn(`Warning: Could not read ${fullPath}`);
					}
				}
			});
		};

		try {
			if (fs.existsSync(docsPath)) {
				findMdFiles(docsPath);
			}
		} catch (error) {
			console.warn(`Warning: Could not read directory ${docsPath}`);
		}
	});

	return slugsByDir;
};

/**
 * Filters deleted slugs by checking if they still exist elsewhere in docs/
 * @param {string[]} deletedSlugs - Array of deleted slugs
 * @returns {Object} Object with filtered array and info about existing slugs
 */
const filterSlugsThatExistInDocs = (deletedSlugs) => {
	const slugsByDir = getAllSlugsInDocs(['docs', 'versioned_docs', 'docs-agents', 'onpremise/docs']);
	const docsSlugs = slugsByDir['docs'] || new Set();
	const versionedSlugs = slugsByDir['versioned_docs'] || new Set();
	const agentsSlugs = slugsByDir['docs-agents'] || new Set();
	const onpremiseSlugs = slugsByDir['onpremise/docs'] || new Set();

	// Get unique deleted slugs
	const uniqueSlugs = [...new Set(deletedSlugs)];

	// Check each unique slug and track where it exists
	const onlyInDocs = [];
	const onlyInVersioned = [];
	const inBoth = [];
	const trulyDeleted = [];

	uniqueSlugs.forEach(slug => {
		const inDocs = docsSlugs.has(slug);
		const inVersioned = versionedSlugs.has(slug);
		const inAgents = agentsSlugs.has(slug);
		const inOnpremise = onpremiseSlugs.has(slug);

		if (inDocs && inVersioned) {
			inBoth.push(slug);
		} else if (inDocs) {
			onlyInDocs.push(slug);
		} else if (inVersioned) {
			onlyInVersioned.push(slug);
		} else if (inAgents) {
			console.log("\x1b[36m%s\x1b[0m", `slug existing in docs-agents/ (filtered out): `, slug);
		} else if (inOnpremise) {
			console.log("\x1b[36m%s\x1b[0m", `slug existing in onpremise/docs/ (filtered out): `, slug);
		} else {
			trulyDeleted.push(slug);
		}
	});

	// Report findings
	if (onlyInDocs.length > 0) {
		console.log("\x1b[36m%s\x1b[0m", `slugs existing only in docs/ (filtered out): `, onlyInDocs);
	}
	if (onlyInVersioned.length > 0) {
		console.log("\x1b[36m%s\x1b[0m", `slugs existing only in versioned_docs/ (filtered out): `, onlyInVersioned);
	}
	if (inBoth.length > 0) {
		console.log("\x1b[36m%s\x1b[0m", `slugs existing in both docs/ and versioned_docs/ (filtered out): `, inBoth);
	}

	const totalFiltered = onlyInDocs.length + onlyInVersioned.length + inBoth.length;
	if (totalFiltered > 0) {
		console.log("\x1b[90m%s\x1b[0m", `total slugs filtered: ${totalFiltered} (from ${deletedSlugs.length} total deletions)`);
	}

	const onlyInAgents = uniqueSlugs.filter(slug => agentsSlugs.has(slug));
	const onlyInOnpremise = uniqueSlugs.filter(slug => onpremiseSlugs.has(slug));
	return {
		filtered: trulyDeleted,
		existingElsewhere: [...onlyInDocs, ...onlyInVersioned, ...inBoth, ...onlyInAgents, ...onlyInOnpremise],
		onlyInDocs: onlyInDocs,
		onlyInVersioned: onlyInVersioned,
		inBoth: inBoth
	};
};

const getNginxRedirects = fileContents => {
  const redirects = [];
  let match;
  while ((match = redirectRegex.exec(fileContents)) !== null) {
    const from = match[1].trim();
    const to = match[2].trim();
    const operatorMatch = locationRegex.exec(match[0]);
    const operator = operatorMatch ? operatorMatch[1] : '';
    redirects.push({
      from: from,
      to: to,
      operator: operator,
    });
  }
  return redirects;
};

const getAddedSlugs = (logString) => {
	const regex = /\+slug:\s*(.*)/gm;
	let match;
	let results = [];
	while ((match = regex.exec(logString)) !== null) {
		results.push(match[1]);
	}
	return results.filter((item) => item !== IGNORE_SLUG);
};

const getDeletedSlugs = (logString, checkExistingDocs = false) => {
	const addedSlugs = getAddedSlugs(logString);
	const regex = /-slug:\s*(.*)/gm;
	let match;
	let results = [];
	while ((match = regex.exec(logString)) !== null) {
		results.push(match[1]);
	}
	let filtered = results.filter(
		(item) => item !== IGNORE_SLUG && !addedSlugs.includes(item)
	);

	// Check if deleted slugs exist elsewhere in docs/
	if (checkExistingDocs && filtered.length > 0) {
		const result = filterSlugsThatExistInDocs(filtered);
		return result.filtered;
	}

	return filtered;
};

const validateChangedFiles = (changedSlugs, redirects) => {
	console.log("\x1b[36m%s\x1b[0m", `changed slugs: `, changedSlugs);
	const unMatchedRedirects = [];
	changedSlugs.forEach((slug) => {
		const matchedRedirect = redirects.some((redirect) => {
			if (redirect.operator === "=") {
				return redirect.from.endsWith(slug);
			}
			if (!redirect.operator) {
				return slug.startsWith(redirect.from);
			}
			return slug.match(redirect.from);
		});

		if (!matchedRedirect) {
			unMatchedRedirects.push(slug);
		}
	});
	console.log("\x1b[33m%s\x1b[0m", `unMatchedRedirects: `, unMatchedRedirects);
	if (unMatchedRedirects.length > 0) {
		throw new Error(
			`Some redirects are not matched with the changed files: ${unMatchedRedirects}`
		);
	}
};

module.exports = {
  redirectRegex,
  locationRegex,
  nginxConfigPath,
  getNginxRedirects,
  validateChangedFiles,
  getDeletedSlugs,
  getAllSlugsInDocs,
  filterSlugsThatExistInDocs,
};
