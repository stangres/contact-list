const fs = require('fs');
const faker = require('faker');

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function generateData({contactsCount, 
					   namesCount, 
					   phonesCountMin, 
					   phonesCountMax,
					   emailsCountMin,
					   emailsCountMax,
					   socialsCountMin,
					   socialsCountMax}) {
	const data = {};
	data.contacts = [];
	data.names = [];
	data.phones = [];
	data.emails = [];
	data.socials = [];

	const phonesCount = getRandomInRange(phonesCountMin, phonesCountMax);
	const emailsCount = getRandomInRange(emailsCountMin, emailsCountMax);
	const socialsCount = getRandomInRange(socialsCountMin, socialsCountMax);

	for (let contactId = 1; contactId <= contactsCount; contactId++) {
		data.contacts.push({id: contactId});

		data.names.push(
		{
			contactId,
			id: contactId,
			name: faker.name.findName()
		});

		for (let phoneId = 1; phoneId <= phonesCount; phoneId++) {
			data.phones.push(
			{
				contactId,
				id: phoneId,
				phone: faker.phone.phoneNumber()
			});
		}

		for (let emailId = 1; emailId <= emailsCount; emailId++) {
			data.emails.push(
			{
				contactId,
				id: emailId,
				email: faker.internet.email()
			});
		}

		for (let socialId = 1; socialId <= socialsCount; socialId++) {
			data.socials.push(
			{
				contactId,
				id: socialId,
				url: faker.internet.url()
			});
		}
	}

	return data;
}


const data = generateData({contactsCount: 10, 
						   namesCount: 10, 
						   phonesCountMin: 1, 
						   phonesCountMax: 3,
						   emailsCountMin: 1,
						   emailsCountMax: 3,
						   socialsCountMin: 1,
						   socialsCountMax: 3});

fs.writeFileSync('db.json', JSON.stringify(data, null, 4));