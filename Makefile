README.md: ./readme_template.md ./src/tests.json
	(cat readme_template.md; cat src/tests.json | jq '.[] | .[] | [.[0], "```" +(.[1] | join("```, ```")) + "```"] | join("@")' -c -r | sed "s/|/\\\|/g; s/@/|/g") > $@
