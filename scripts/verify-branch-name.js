import { execSync } from 'child_process';

console.log('🌿 Verifying branch name format...');

// Regex to enforce branch name pattern: feature/TICKET-ID-description or fix/TICKET-ID-description
const branchRegex = /^(feature|fix|hotfix)\/([A-Z]+-\d+)-[a-z0-9-]+$/;

try {
    // Get current branch name
    const branchName = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    console.log(`📁 Current branch: "${branchName}"`);

    // Skip validation for main/master branches
    if (['main', 'master', 'develop'].includes(branchName)) {
        console.log('✅ Main/master/develop branch detected - skipping validation.');
        process.exit(0);
    }

    // Check if the branch name matches the regex
    if (!branchName.match(branchRegex)) {
        console.error('❌ Invalid branch name format!');
        console.error('📋 Required pattern: type/TICKET-ID-description');
        console.error('✨ Examples:');
        console.error('   feature/GEN-1234-add-user-authentication');
        console.error('   fix/API-5678-fix-null-pointer-exception');
        console.error('   hotfix/DB-9012-urgent-fix');
        console.error('');
        console.error('Allowed types: feature, fix, hotfix');
        console.error('Description should be lowercase with hyphens');
        process.exit(1);
    }

    console.log('✅ Branch name format is valid!');
    console.log('🎉 Branch name validation passed!');
} catch (error) {
    console.error(`❌ Error validating branch name: ${error.message}`);
    process.exit(1);
}