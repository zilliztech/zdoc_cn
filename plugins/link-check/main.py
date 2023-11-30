import os
import requests
from bs4 import BeautifulSoup

def list_files_recursively(directory):
    f = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            f.append(os.path.join(root, file))

    return f
            
def check_links(file):
    with open(file, 'r') as f:
        contents = f.read()

    soup = BeautifulSoup(contents, 'html.parser')

    checked_links = []
    broken_links = []

    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.startswith('http'):
            print(f'Checking link: {href} in file: {file}')
            if href.endswith('.json') or "assets.zilliz.com" in href:
                continue
            
            if len([ x for x in checked_links if x[0] == href and x[1] == 200 ]) > 0:
                print('  Already checked! OK!')
                continue

            if len([ x for x in checked_links if x[0] == href and x[1] != 200 ]) > 0:
                print('  Already checked! Broken link!')
                continue

            try:
                response = requests.get(href)
                if response.status_code != 200:
                    checked_links.append((href, response.status_code))
                    broken_links.append((href, file))
                    print(f'Broken link: {href} in file: {file}')
                else:
                    checked_links.append((href, 200))
                    print('  OK!')
            except requests.exceptions.RequestException as e:
                print(f'Error checking link: {href} in file: {file}. Error: {e}')

    return broken_links

if __name__ == '__main__':
    files = list_files_recursively('build')

    broken_links = []

    for file in files:
        broken_links.append(check_links(file))

    print('Broken links:')
    for link in broken_links:
        print(link)

        