pipeline { 
  agent any

  environment {
      repository = "seonwoohongmin/frontend"  // repository name of your docker hub 
      DOCKERHUB_CREDENTIALS = credentials('dockerhub') // jenkins에 등록해 놓은 docker hub credentials 이름
      dockerImage = ' ' 
  }
  stages {
      stage('Cloning front-end Git') {
            steps { 
		checkout changelog: false, poll: false, scm: [$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Goorm-4-Youtube/frontEnd.git']]]
            }
        } 
      stage('Build an image') { 
          steps { 
              script { 
                  sh 'cp /var/jenkins_home/workspace/environment.prod.ts /var/jenkins_home/workspace/frontendpipline/src/environments' //env 파일을 복사
                  sh 'docker build -t $repository:v$BUILD_NUMBER .' // docker image build
              }
          } 
      }
      stage('Dockerhub Login'){
          steps{
              sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub login
          }
      }
      stage('Push our front-end image') { 
          steps { 
              script {
                sh 'docker push $repository:v$BUILD_NUMBER' //docker image push
              } 
          }
      } 
      stage('Cleaning up') { 
		  steps { 
              sh "docker rmi -f $repository:v$BUILD_NUMBER" // docker image remove
          }
      } 
  }
    }
