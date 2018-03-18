#!groovy

node('dev-slave1') {


    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Test'){

         env.NODE_ENV = "dev"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm prune'
         sh 'npm install'
         sh 'npm test'

       }

       stage('Deploy'){

         echo 'Push to Repo'
         sh 'docker login -u $DOCKERHUB_UNAME -p $DOCKERHUB_PASSWRD'
         sh 'docker push'
       }

       stage('Cleanup'){

         echo 'prune and cleanup'
         sh 'npm prune'
         sh 'rm node_modules -rf'

         mail body: 'project build successful',
                     from: 'surya@example.com',
                     replyTo: 'surya@example.com',
                     subject: 'project build successful',
                     to: 'project_dist@example.com'
       }



    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'surya@example.com',
            replyTo: 'surya@example.com',
            subject: 'project build successful',
            to: 'project_dist@example.com'

        throw err
    }

}
