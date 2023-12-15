import os
import re
import requests

def list_files_recursively(directories):
    f = []
    for directory in directories:
        for root, dirs, files in os.walk(directory):
            for file in files:
                f.append(os.path.join(root, file))

    return f
            
def check_links(file):
    if file.endswith('.md'):
        with open(file, 'r') as f:
            content = f.read()

        markdown_link_partten = r'\[(.*?)\]\((.*?)\)'
        matches = re.findall(markdown_link_partten, content)

        for text, link in matches:
            if link.startswith('http'):
                found = [ x for x in checked_links if x[1] == link ]
                if found:
                    print(f'Duplicate link {link} on page {file} - {found[0][3]}')

                try:
                    r = requests.head(link)
                    if r.status_code != 200:
                        broken_links.append((text, link, file, r.status_code))
                    checked_links.append((text, link, file, r.status_code))

                    print (f'Checked {link} on page {file} - {r.status_code}')
                except Exception as e:
                    broken_links.append((text, link, file, e))
                    checked_links.append((text, link, file, e))
                    print (f'Checked {link} on page {file} - {e}')

    return checked_links


if __name__ == '__main__':
    files = list_files_recursively(["docs", "reference"])

    checked_links = []
    broken_links = []

    for file in files:
        check_links(file)

    with open('broken_links.txt', 'w') as f:
        l = {}

        for text, link, file, status in broken_links:
            if file not in l:
                l[file] = []

            l[file].append((text, link, status))
        
        report = ''

        for file, links in l.items():
            report += f'File: {file}\n\n'
            for text, link, status in links:
                report += f'\t - [{text}]({link})\n'
                report += '\t\t - Status: {}\n'.format(status)

        f.write(report)