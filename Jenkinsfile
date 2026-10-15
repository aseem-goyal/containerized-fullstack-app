pipeline {
    agent any

    environment {
        DOCKER_HOST = 'tcp://172.20.0.4:2376'
        DOCKER_TLS_VERIFY = '1'
        DOCKER_CERT_PATH = '/tmp/vfs-client-certs'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Configuration') {
            steps {
                sh 'docker compose config'
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                    cd backend

                    python3 -m venv venv
                    . venv/bin/activate

                    pip install --no-cache-dir -r requirements.txt
                    pip install pytest

                    pytest -v
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('Start Application') {
            steps {
                sh 'docker compose up -d'
            }
        }

        
        stage('Health Check') {
            steps {
                sh '''
                    set -e
                    echo "Checking running containers..."
                    docker compose ps

                    echo "Checking backend health..."
                    docker compose exec -T backend python -c "import urllib.request; print(urllib.request.urlopen('http://localhost:5000/health', timeout=5).read().decode())"

                    echo "Checking frontend health..."
                    docker compose exec -T frontend node -e 'fetch("http://localhost:3000/health").then(async r => { console.log("HTTP", r.status, await r.text()); if (!r.ok) process.exit(1); }).catch(e => { console.error(e); process.exit(1); })'

                    echo "All services are responding!"
                '''
            }
        }


        stage('Integration Test') {
            steps {
                sh '''
                    set -e
                    echo "Checking running containers..."
                    docker compose ps

                    echo "Waiting for backend health..."
                    docker compose exec -T backend python -c "import urllib.request; print(urllib.request.urlopen('http://localhost:5000/health', timeout=5).read().decode())"

                    echo "Waiting for frontend health..."
                    docker compose exec -T frontend node -e "fetch('http://localhost:3000/health').then(async r => { console.log('HTTP', r.status, await r.text()); if (!r.ok) process.exit(1); }).catch(e => { console.error(e); process.exit(1); })"

                    echo "All services are responding!"
                '''

            }
        }
    }

    post {
        always {
            sh 'docker compose down || true'
        }

        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed. Check the logs above.'
        }
    }
}
