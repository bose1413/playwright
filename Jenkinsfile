pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.33.0-jammy' } }
   stages {
      stage('installation') {
         steps {
            // Depends on your language / test framework
            sh 'npm install'
            sh 'npx playwright test'
         }
      }
      stage('running tests') {
         steps {
            sh 'npx playwright test'
         }
      }
   }
}