import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma, $Enums } from '@prisma/client'

export async function GET() {
  try {
    const members = await prisma.members.findMany({
      include: {
        church: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        ministries: {
          include: {
            ministry: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(members)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      age, 
      church_id,
      role = 'MEMBER',
      gender,
      street,
      city,
      state,
      zip,
      country,
      birthDate,
      baptismDate,
      pictureUrl,
      notes
    } = body

    if (!firstName || !lastName || !email || !church_id) {
      return NextResponse.json(
        { error: 'First name, last name, email, and church_id are required' },
        { status: 400 }
      )
    }

    // Use Prisma.MembersUncheckedCreateInput for better type safety
    const memberData: Prisma.MembersUncheckedCreateInput = {
      firstName,
      lastName,
      email,
      phone,
      age,
      role: role as $Enums.MemberRole,
      gender: gender as $Enums.Gender,
      street,
      city,
      state,
      zip,
      country,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      baptismDate: baptismDate ? new Date(baptismDate) : undefined,
      pictureUrl,
      notes,
      church_id,
    }

    const member = await prisma.members.create({
      data: memberData,
      include: {
        church: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { error: 'Failed to create member' },
      { status: 500 }
    )
  }
}