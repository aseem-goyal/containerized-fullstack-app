pipeline {
    agent any

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
                    echo "Checking running containers..."
                    docker compose ps

                    echo "Checking backend health..."
                    docker compose exec -T backend python -c \
                    "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')"

                    echo "Checking frontend health..."
                    docker compose exec -T frontend wget \
                    --no-verbose --tries=1 --spider \
                    http://localhost:3000/health

                    echo "All services are healthy!"
                '''
            }
        }

        stage('Integration Test') {
            steps {
                sh '''
                    docker compose exec -T backend python -c "
                    import urllib.request
                    response = urllib.request.urlopen('http://localhost:5000/')
                    assert response.status == 200
                    print('Backend API test passed')
                    "
                '''
            }
        }
    }

    post {
        always {
            sh 'docker compose down -v || true'
        }

        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed. Check the logs above.'
        }
    }
}
