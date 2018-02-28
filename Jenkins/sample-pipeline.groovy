node {
   echo 'Hello World'
   stage "Build"
   // Make a sample directory.
    sh "mkdir -m 777 surya-sample"
    
   stage "Test"
   //Verify if the directory has been created
   sh "ls -ltr|grep surya*"
  // sh "if [ $? -eq 0 ] then echo \"Directory Found\" else echo \"Directory Not found\""
   
   stage "Deploy"
   //Verify the deploy stage
   sh "echo \"Deployment initiated\""
}
