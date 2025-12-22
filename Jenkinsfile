pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Repository cloned automatically by Jenkins'
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                cd backend
                python3 -m venv venv
                . venv/bin/activate
                pip install -r requirements.txt
                '''
            }
        }

        stage('Run Flask App') {
            steps {
                sh '''
                cd backend
                . venv/bin/activate
                nohup python app.py > flask.log 2>&1 &
                '''
            }
        }
    }
}
