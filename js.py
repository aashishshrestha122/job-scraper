import requests
from bs4 import BeautifulSoup
import psycopg2

# PostgreSQL database configuration
config = {
    'dbname': 'jobportal',
    'user': 'aashish',
    'password': 'aashish',
    'host': 'localhost',
    'port': '5432'  # Replace with your PostgreSQL port if different
}


# Establish a connection to the PostgreSQL database
try:
    connection = psycopg2.connect(**config)
    query = connection.cursor()

    if connection:
        print('Connected to PostgreSQL database')
except psycopg2.Error as e:
    print(f"Error: {e}")


def search_jobs(job_title, location):
    base_url = 'https://seek.com.au/'
    params = {'title': job_title}
    page_number = 1

    response = requests.get(base_url + job_title + '-jobs/in-' + location)
    
    while True:
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            job_listings = soup.find_all('div', class_='_1wkzzau0 a1msqi6m')
            for job in job_listings:
                # job_title_element = job.find('h3', class_='_1wkzzau0 a1msqi4y lnocuo0 lnocuol _1d0g9qk4 lnocuov lnocuo21')
                job_title_element = job.find(attrs={"data-automation": "jobTitle"})

                # Check if the element is found
                if job_title_element:
                    job_title = job_title_element.text.strip()       
                    
                company = job.find(attrs={"data-automation": "jobCompany"})
                if company:
                    company = company.text.strip()   
                
                location = job.find(attrs={"data-automation": "jobLocation"})
                if location:
                    location = location.text.strip()   
                
                link = job.find('a')
                if link:
                    # Access the 'href' attribute value
                    job_link = link.get('href')
                    actual_job_link = 'https://seek.com.au/' + job_link

                if job_title and company and location:
                    # insert into database
                    insert_query = "INSERT INTO jobs (job_title, job_location, company, job_link) VALUES (%s, %s, %s, %s)"
                    values = [job_title, location, company, actual_job_link]

                    query.execute(insert_query, values)

                    # Commit the transaction to save changes
                    connection.commit()

                    print("Data inserted successfully!")
                    print(f"Job Title: {job_title}\nCompany: {company}\nLocation : {location}\nLink : {actual_job_link}\n--------------------------------")

        else:
            print(f"Failed to retrieve job listings. Status Code: {response.status_code}")
            page_number += 1

if __name__ == "__main__":
    job_title = input("Enter the job title you are searching for: ")
    location  = input ("Enter the location for the job that you are searching for: ")
    search_jobs(job_title, location)
